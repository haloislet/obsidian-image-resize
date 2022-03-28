export function setSize(text: String, width: number, height?: number) {
    const heightStr = height ? `x${height}` : ''
    const sizeStr = `${width}${heightStr}`;
    return text.replace(/\!\[(.*?)\|?(\d*|(\d*x\d*))\]/g, (_, p1) => {
        if(p1) {
            return `![${p1}|${sizeStr}]`
        } else {
            return `![${sizeStr}]`
        }
    });
}

export function clearSize(text: String) {
    return text.replace(/\!\[(.*?)(\|?)(\d*|(\d*x\d*))\]/g, (_, p1) => {
        if(p1) {
            return `![${p1}]`
        } else {
            return `![]`
        }
    });
}