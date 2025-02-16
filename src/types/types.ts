export interface IDate {
    dayNum: number | null;
    month: number | null;
    year: number | null;
}

export interface IDayItem {
    dayNum: number;
    day: number;
    month: number,
    year: number,
}

export interface ICompareFlags {
    regionIsAsc: boolean | undefined;
    nameIsAsc: boolean | undefined;
    addressIsAsc: boolean | undefined;
    eduLvlIsAsc: boolean | undefined;
}

export interface PipeParams {
    schoolItems: ISchoolsItem[];
    flags: ICompareFlags;
    filterValue: string;
    filterDateFrom: IDate;
    filterDateTo: IDate;
    eduCategory: string;
    status: string;
}

export interface ISupplements  {
    uuid: string;
    number: string;
    is_for_branch: boolean;
    form_number: string;
    serial_number: string;
    note: string | null;
    status: {
        name: string;
        code: string;
    };
    edu_org: {
        uuid: string;
        full_name: string;
        short_name: string;
        head_edu_org_id: string | null;
        is_branch: boolean;
        contact_info: {
            post_address: string;
            phone: string | null;
            fax: string | null;
            email: string | null;
            website: string | null;
        };
        legal_info: {
            ogrn: string | null;
            inn: string | null;
            kpp: string | null;
        };
        head: { post: string | null; name: string | null };
        form: { name: string | null; code: string | null };
        kind: { name: string | null; code: string | null };
        type: { name: string | null; code: string | null };
        region: { name: string | null; code: number | null };
        federal_district: { name: string | null; short_name: string | null; code: string | null };
    };
    educational_programs: {
        uuid: string;
        type: { name: string | null; code: string | null };
        kind: { name: string | null; code: string | null };
        edu_level: { name: string; short_name: string | null; code: string };
        edu_sub_level: { name: string | null; code: string | null };
        edu_normative_period: string | null;
        program: { name: string | null; code: string | null };
        okso_code: string | null;
        ugs: { name: string | null; code: string | null };
        qualification: string | null;
        is_accredited: boolean;
        is_canceled: boolean;
        is_suspended: boolean;
    }[];
}


export type ISchoolsItem = {
    uuid: string;
    is_federal: boolean;
    reg_number: string;
    serial_number: string | null;
    form_number: string | null;
    issue_date: string; // ISO 8601 date string
    end_date: string | null;
    regulatory: string;
    status: {
        name: string | null;
        code: string | null;
    };
    type: {
        name: string;
        code: string;
    };
    created_at: string;
    updated_at: string;
    edu_org: {
        uuid: string;
        full_name: string;
        short_name: string;
        head_edu_org_id: string | null;
        is_branch: boolean;
        contact_info: {
            post_address: string;
            phone: string | null;
            fax: string | null;
            email: string | null;
            website: string | null;
        };
        legal_info: {
            ogrn: string | null;
            inn: string | null;
            kpp: string;
        };
        head: {
            post: string | null;
            name: string | null;
        };
        form: { name: string | null; code: string | null };
        kind: { name: string | null; code: string | null };
        type: { name: string | null; code: string | null };
        region: { name: string | null; code: number | null };
        federal_district: { name: string | null; short_name: string | null; code: string | null };
    };
    supplements: ISupplements[];
    decisions: any[];
};

export interface ISchoolApiResponse {
    "pages_count": number,
    "page": number,
    "total_count": number,
    "list": ISchoolsItem[]
}

interface IFederalDistricts {
    id: number;
    name: string;
    short_name: string;
    code: string;
}

export type IFederalDistrictsResponse = IFederalDistricts[];

export interface IRegions {
    id: number;
    name: string;
}

export type IRegionsResponse = IRegions[];

export interface IServerResponse<T>{
    "status": boolean,
    "message": string,
    "data": T;
}

export type TSelectItem = Partial<IFederalDistricts>