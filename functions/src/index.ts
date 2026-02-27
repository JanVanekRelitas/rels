import { initializeApp } from 'firebase-admin/app';

initializeApp();

// Auth triggers
export { onUserCreate } from './auth/on-user-create';

// Firestore triggers
export { onDealWrite } from './triggers/on-deal-write';

// Registry HTTP functions
export { registryAres } from './registry/ares';
export { registryRuian } from './registry/ruian';
export { registryKatastr } from './registry/katastr';
