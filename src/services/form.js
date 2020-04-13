const getAllTag = (id_template, listOfTag) =>
{
    return new Promise((resolve, reject) =>
    {
        var items, patt, str, result;
        listOfTag = [];
        // str = Ambil isi template dari id_template

        patt = /Rp.{1,11}\.\d\d\d/i;
        if (patt.test(str))
        {
            for (var i = 0; i < patt.length; ++i)
            {
                items.key = "nilai_uang";
                items.value = str.match(patt)[i];
                listOfTag.push(items);
            }
        }

        patt = /\d{1,2} .{0,9} 2\d\d\d/i;
        if (patt.test(str))
        {
            for (var i = 0; i < patt.length; ++i)
            {
                items.key = "tanggal";
                items.value = str.match(patt)[i];
                listOfTag.push(items);
            }
        }

        patt = /\d+\W.*[^\w\s]\d\d\d\d/i;
        if (patt.test(str))
        {
            for (var i = 0; i < patt.length; ++i)
            {
                items.key = "nomor";
                items.value = str.match(patt)[i];
                listOfTag.push(items);
            }
        }

        if (err)
        {
            reject(err);
        }
        else
        {
            resolve(listOfTag);
        }
    });
};

export default
{
    getAllTag
};