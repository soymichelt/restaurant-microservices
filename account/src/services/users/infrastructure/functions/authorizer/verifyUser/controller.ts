/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerifyUserTokenUseCase } from '@services/users/application/useCases/verifyUser/verifyUserTokenUseCase';
import { DomainException } from '@shared/domain/exceptions/baseException';
import { UnauthorizedException } from '@shared/domain/exceptions/unauthorizedException';
import { BaseController } from '@shared/infrastructure/controllers/baseController';
import { BaseResponseType } from '@shared/infrastructure/controllers/responses/baseResponseType';
import { inject, injectable } from 'tsyringe';

type VerifyIfAuthorizedControllerRequest = {
  routeArn: string;
  headers: {
    authorization: string;
  };
};

type Statement = {
  Action: string;
  Effect: string;
  Resource: string;
};

type PolicyDocument = {
  Version: string;
  Statement: Statement[];
};

type AuthorizerLambdaIamResponse = {
  principalId?: string;
  policyDocument?: PolicyDocument;
  context?: Record<string, string | number | boolean>;
};

@injectable()
export class VerifyIfAuthorizedController extends BaseController<
  VerifyIfAuthorizedControllerRequest,
  AuthorizerLambdaIamResponse
> {
  constructor(@inject('VerifyUserTokenUseCase') private useCase: VerifyUserTokenUseCase) {
    super();
  }

  public async run(request: VerifyIfAuthorizedControllerRequest): Promise<AuthorizerLambdaIamResponse> {
    try {
      const { authorization: token } = request.headers;
      const result = await this.useCase.run({
        token: token?.replace('Bearer ', ''),
      });

      if (!result) {
        throw new UnauthorizedException();
      }

      return this.generatePolicyDocument(result.userId, 'Allow', request.routeArn, result);
    } catch (error) {
      if (error instanceof DomainException) {
        const userId = error.metadata.userId as string;
        return this.generatePolicyDocument(userId, 'Deny', request.routeArn);
      }

      throw error;
    }
  }

  protected override generateSuccessResult(response: AuthorizerLambdaIamResponse): BaseResponseType {
    return response;
  }

  protected override generateErrorResult(error: DomainException): BaseResponseType {
    this.logger.error({
      ...(error.toPrimitives ? error.toPrimitives() : error),
      name: error.name,
      stack: error.stack,
      message: error.message,
    });

    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }

  private generatePolicyDocument(
    principalId: string,
    effect: string,
    resource: string,
    context: Record<string, any> = {},
  ): AuthorizerLambdaIamResponse {
    const response: AuthorizerLambdaIamResponse = {
      principalId,
      context,
    };

    if (effect && resource) {
      response.policyDocument = {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource,
          },
        ],
      };
    }

    return response;
  }
}
