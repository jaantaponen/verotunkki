import { FileObject } from "react-mui-dropzone";

/**
 * Workaround for browsers.
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it
 */
const b64_to_utf8 = (str: string) => {
    return decodeURIComponent(escape(window.atob(str)));
}

/**
 * Gets the current file and checks it againts parsers.
 * @param filesCopy 
 * @returns headers
 */
const chooseCSVParser = async (filesCopy: FileObject[], parsers: any[]) => {
    const errors: Error[] = []
    for (let i = 0; i < parsers.length; i++) {
        try {
            const fileContentBuffer = Buffer.from(b64_to_utf8(filesCopy[0].data ? filesCopy[0].data.toString().split(',')[1] : ""))
            const fileContent = fileContentBuffer.toString('utf8')
            const parsedData = await parsers[i](fileContent)
            return parsedData
        } catch (e: any) {
            errors.push(e)
        }
    }
    return [{ Source: "Error", Error: (errors.find(e => (e instanceof TypeError)) ?? errors[0]) }]
}

/**
 * Due to Jest (26.x.x) being the latest stable release, we have to default to commonjs module for tests.
 * The ESM module support through Babel was not sufficient and resulted in different behaviour. 
 * @returns parse function
 */
const loadParser: any = async () => {
    if (process.env.NODE_ENV === 'test') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore  
        const lib = await import('csv/dist/cjs/sync.cjs')
        return lib.parse
    } else {
        const lib = await import('csv/dist/esm/sync')
        return lib.parse
    }
}

export { chooseCSVParser, loadParser }