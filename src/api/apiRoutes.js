const BASE_URL = 'http://localhost:3001'; // Cambia esto por la URL de tu API

const apiRoutes = {
    auth: {
        login: `${BASE_URL}/auth/login`,
        register: `${BASE_URL}/auth/register`
    },
    services: {
        getAll: `${BASE_URL}/services`,
        getById: (id) => `${BASE_URL}/services/${id}`,
        create: `${BASE_URL}/services`,
        update: (id) => `${BASE_URL}/services/${id}`,
        delete: (id) => `${BASE_URL}/services/${id}`
    },
    serviceStatuses: {
        getAll: `${BASE_URL}/service-statuses`,
        getById: (id) => `${BASE_URL}/service-statuses/${id}`,
        create: `${BASE_URL}/service-statuses`,
        update: (id) => `${BASE_URL}/service-statuses/${id}`,
        delete: (id) => `${BASE_URL}/service-statuses/${id}`
    },
    claims: {
        getAll: `${BASE_URL}/claims`,
        getById: (id) => `${BASE_URL}/claims/${id}`,
        create: `${BASE_URL}/claims`,
        update: (id) => `${BASE_URL}/claims/${id}`,
        delete: (id) => `${BASE_URL}/claims/${id}`
    },
    clients: {
        getAll: `${BASE_URL}/clients`,
        getById: (id) => `${BASE_URL}/clients/${id}`,
        create: `${BASE_URL}/clients`,
        update: (id) => `${BASE_URL}/clients/${id}`,
        delete: (id) => `${BASE_URL}/clients/${id}`
    },
    installations: {
        getAll: `${BASE_URL}/installations`,
        getById: (id) => `${BASE_URL}/installations/${id}`,
        create: `${BASE_URL}/installations`,
        update: (id) => `${BASE_URL}/installations/${id}`,
        delete: (id) => `${BASE_URL}/installations/${id}`
    },
    mobiles: {
        getAll: `${BASE_URL}/mobiles`,
        getById: (id) => `${BASE_URL}/mobiles/${id}`,
        create: `${BASE_URL}/mobiles`,
        update: (id) => `${BASE_URL}/mobiles/${id}`,
        delete: (id) => `${BASE_URL}/mobiles/${id}`
    },
    materials: {
        getAll: `${BASE_URL}/materials`,
        getById: (id) => `${BASE_URL}/materials/${id}`,
        create: `${BASE_URL}/materials`,
        update: (id) => `${BASE_URL}/materials/${id}`,
        delete: (id) => `${BASE_URL}/materials/${id}`
    },
    usedMaterialsAttentions: {
        getAll: `${BASE_URL}/usedMaterialsAttentions`,
        getById: (id) => `${BASE_URL}/usedMaterialsAttentions/${id}`,
        create: `${BASE_URL}/usedMaterialsAttentions`,
        update: (id) => `${BASE_URL}/usedMaterialsAttentions/${id}`,
        delete: (id) => `${BASE_URL}/usedMaterialsAttentions/${id}`
    }
};

export default apiRoutes;
