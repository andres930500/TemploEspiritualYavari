import { siteConfig } from '../config/site';
import { getPublicationStatus } from './validation';
import { services } from '../data/services';

export const publicationStatus = getPublicationStatus(siteConfig, services);
