import axios from 'axios';

const GET_TYPE = 0;
const SET_TYPE = 1;

export function replaceAll(str, data_pemenang, data_form) {
    var re = new RegExp('(&lt;){2}[^&]*(&gt;){2}', 'gi');

    return str.replace(re, function(matched) {
        let tagInfo = getTagInfoFromMatch(matched);
        if (tagInfo.type === GET_TYPE) {
            return data_pemenang[tagInfo.tagName];
        } else if (tagInfo.type === SET_TYPE) {
            return data_form[tagInfo.tagName];
        }
    });
}

export function getTagInfoFromMatch(matchingTag) {
    const setGetPartIdx = 0;
    const tagNamePartIdx = 1;
    let matchParts = matchingTag.split(':');
    let isSet = matchParts[setGetPartIdx].includes('set');
    // -8 to remove 8 last character which is &gt;&gt;
    let tagName = matchParts[tagNamePartIdx].slice(0, -8);
    return { type: isSet, tagName };
}

export function getDocxFromCloudmersive(populatedContent) {
    return axios({
        url: 'https://api.cloudmersive.com/convert/html/to/docx',
        method: 'POST',
        responseType: 'arraybuffer',
        headers: {
            Apikey: process.env.CLOUDMERSIVE_API_KEY,
            'Content-Type': 'application/json',
        },
        data: {
            Html: populatedContent,
        },
    });
}
