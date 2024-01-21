import { WithStringId } from '@shared/infrastructure/persistence/mongodb/withStringId';
import { Document } from 'mongodb';

export type MongoDocument = WithStringId<Document>;
