import axios from 'axios'
import { linkedIn } from "../constants";

const { ORGANIZATION_APIS_HEADER } = linkedIn.header;
const { organizationIdUrl, fetchIndustryById, vanityNameUrl, projection } = linkedIn.urls;

const requestLinkedinApi = (url: string, access_token: string)=> {
    // return await axios.get(url, { headers: ORGANIZATION_APIS_HEADER(access_token) })
    return new Promise(async function (resolve, reject) {
        try {
            const res: any = await axios.get(url, { headers: ORGANIZATION_APIS_HEADER(access_token) });
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
};

const findOrganizationById = (organizationId: string, access_token: string): Promise<{ organization: string, industry: string }> => {
    return new Promise(async (resolve, reject) => {
        try {
            const organizationRes: any = await requestLinkedinApi(`${organizationIdUrl}/${organizationId}?${projection}`, access_token);
            const organization = organizationRes.data;

            const industriesUrn = organization.industries[0];
            // convert industry Urn to id to be able to fetch industry name
            const industryId = convertIndustryUrnToId(industriesUrn);

            // fetch industry name by industryId
            const industryRes: any = await getIndustryName(industryId, access_token);
            const industry = industryRes.data;// TODO fix  industryRes Type assertion

            resolve({ organization, industry });
        } catch (err) {
            reject(err);
        }
    });
};

const getIndustryName = (industryId: string, access_token: string) => {
    return requestLinkedinApi(`${fetchIndustryById}/${industryId}`, access_token)
};

const findOrganizationsByVanityName = (vanityName: string, access_token: string): Promise<{ organization: string, industry: string }> => {
    return new Promise(async (resolve, reject) => {
        try {
            // fetch organization by vanity name
            const res: any = await requestLinkedinApi(`${vanityNameUrl}${vanityName}`, access_token);

            // grab organization id from the result to request findOrganizationById to get more info like industry URN
            const organizationId = res.data.elements[0].id;

            // request get organization by id
            resolve(findOrganizationById(organizationId, access_token));
        } catch (err) {
            reject(err);
        }
    });
};

function convertIndustryUrnToId(industriesUrn: string) {
    // industies has the following format: ["urn:li:industry:22"].
    // we need the id which is the number in the last digit which is 22 in this exp
    const industriesList = industriesUrn.split(':');
    return industriesList[industriesList.length - 1];
};

export { findOrganizationsByVanityName, findOrganizationById }