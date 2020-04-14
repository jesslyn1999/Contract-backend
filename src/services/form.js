const getAllTag = (id_template, listOfTag) => {
    return new Promise((resolve, reject) => {
        var items, pattern, str, result;
        listOfTag = [];
        // str = Ambil isi template dari id_template

        pattern = /:(\w+)>>/g;
        result = pattern.exec(str);

        while (result != null) {
            listOfTag.push(result[1]);
        }

        if (err) {
            reject(err);
        } else {
            resolve(listOfTag);
        }
    });
};

export default {
    getAllTag,
};