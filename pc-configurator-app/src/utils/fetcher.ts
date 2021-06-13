import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async function <JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}