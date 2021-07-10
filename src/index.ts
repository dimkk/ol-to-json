const convert = (text: string, delimeter = '\r\n') => {
    /*eslint prefer-const: 0*/
    let data: any = {};
    const splitText = text.split(delimeter);
    splitText.map((t) => {
        formObject(t, data);
    });
    return data;
};

export default convert;

const isNeededListItem = (str: string): boolean => {
    const regexp = /^(\d+\.)+(\s|\d\|\.)/;
    return regexp.exec(str) != null;
};

const formObject = (str: string, result: any): any => {
    if (!str) return;
    str = str.trim();
    const checkResult = isNeededListItem(str);
    if (checkResult) {
        result.currentPath = getPath(str);
        const text = getText(str);
        deepNestKeysValues(0, result, result.currentPath, text);
    } else {
        if (!result.currentPath) result.currentPath = [];
        if (result.currentPath.length === 0) {
            result['header'] = result['header'] || '';
            result['header'] += str;
        } else {
            deepNestKeysValues(0, result, result.currentPath, getText(str));
        }
    }
};

function deepNestKeysValues(p: any, localobj: any, currentPath: any, value?: string) {
    localobj[currentPath[p]] = localobj[currentPath[p]] || {};
    if (p === currentPath.length - 1) {
        localobj[currentPath[p]]['text'] = localobj[currentPath[p]]['text'] || '';
        localobj[currentPath[p]]['text'] += value;
        return;
    }
    deepNestKeysValues(p + 1, localobj[currentPath[p]], currentPath, value);
}

function isNumeric(str: string) {
    if (typeof str != 'string') return false; // we only process strings!
    return !isNaN(parseFloat(str));
}

function getPath(str: string): any {
    let result = [];
    // assuming we get 1.2.3. [some text] or X.[X.] [some text] or [some text] as str
    const split = str.split('. ');
    const numbers = split[0].split('.');
    result = numbers.map((n) => {
        if (isNumeric(n)) return n;
    });
    return result;
}

function getText(str: string) {
    const split = str.split('. ');
    if (split.length > 1) return split[1];
    else return split[0];
}
