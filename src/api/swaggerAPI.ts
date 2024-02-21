import {$apiT} from "./apiConfig.ts";

export const doctorsAPI = {
    getDoctors: async () => {
        const { data } = await $apiT.get(`/doctor/list/`)
        return data
    },
    addEditDoctor: async (action: string, id: string | number, item: object) => {
        if (action === 'edit') {
            return await $apiT.put(`/doctor/retrieve-update/${id}/`, item)
        } else {
            return await $apiT.post(`/doctor/create/`, item)
        }
    },
    deleteDoctor: async (id: string | number) => {
        return await $apiT.delete(`/doctor/destroy/${id}/`)
    },
}

export const baseAPI = {
    getCounty: async () => {
        const { data } = await $apiT.get('/base/country-list/')
        return data
    },
    getRegion: async () => {
        const { data } = await $apiT.get('/base/region-list/')
        return data
    },
    getDistrict: async () => {
        const { data } = await $apiT.get('/base/district-list/')
        return data
    },
    getQuarter: async () => {
        const { data } = await $apiT.get('/base/quarter-list/')
        return data
    },

    getPermission: async () => {
        const { data } = await $apiT.get('/base/perimission-list/')
        return data
    },
    getGroupPermission: async () => {
        const { data } = await $apiT.get('/base/group-perimission-list/')
        return data
    },
    createGroupPermission: async (item: object) => {
        return await $apiT.post('/base/group-perimission-create/', item)
    }
}

export const benefitCategory = {
    getCategories: async () => {
        const { data } = await $apiT.get('/benefit-category/list/')
        return data
    }
}
