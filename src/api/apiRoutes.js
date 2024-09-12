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
        getDetailsByid: (id) => `${BASE_URL}/claims/details/${id}`,
        getUnassigned: `${BASE_URL}/claims/unassigned`,
        create: `${BASE_URL}/claims`,
        update: (id) => `${BASE_URL}/claims/${id}`,
        delete: (id) => `${BASE_URL}/claims/${id}`,
        closeWithoutVisit: (id) => `${BASE_URL}/claims/closeWithoutVisit/${id}`
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
        getUnassigned: `${BASE_URL}/installations/unassigned`,
        getById: (id) => `${BASE_URL}/installations/${id}`,
        create: `${BASE_URL}/installations`,
        update: (id) => `${BASE_URL}/installations/${id}`,
        delete: (id) => `${BASE_URL}/installations/${id}`
    },
    mobiles: {
        getAll: `${BASE_URL}/mobiles`,
        getById: (id) => `${BASE_URL}/mobiles/${id}`,
        assign: `${BASE_URL}/mobiles`,
        assignMobilesAndInstallations: `${BASE_URL}/mobiles/assign`,
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
    },

    employees: {
        getAllTechnicians: `${BASE_URL}/employees/technicians`,
        getAllAvailableTechnicians: `${BASE_URL}/employees/technicians/available`,
        getAll: `${BASE_URL}/employees`,
        getById: (id) => `${BASE_URL}/employees/${id}`,
        create: `${BASE_URL}/employees/`,
        delete: (id) => `${BASE_URL}/employees/${id}`,
        update: (id) => `${BASE_URL}/employees/${id}`,

    },

    vehicles: {
        getAll: `${BASE_URL}/vehicles/`,
        getAvailable: `${BASE_URL}/vehicles/available`,
        getById: (id) => `${BASE_URL}/vehicles/${id}`,
        create: `${BASE_URL}/vehicles/`,
        delete: (id) => `${BASE_URL}/vehicles/${id}`,
        update: (id) => `${BASE_URL}/vehicles/${id}`,

    },

};

export default apiRoutes;
