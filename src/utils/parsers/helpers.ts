import _ from "lodash";
import { FileObject } from "react-mui-dropzone";
import { resultFromParse } from "../../components/PreviewData";

/**
 * Workaround for browsers.
 * https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it
 */
const b64_to_utf8 = (str: string) => (decodeURIComponent(escape(window.atob(str))))

const decodeUTF16LE = (binaryStr: string) => {
    const cp = [];
    for (let i = 0; i < binaryStr.length; i += 2)
        cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
    return String.fromCharCode(...cp);
}

/**
 * Gets the current file and checks it againts parsers.
 * @param filesCopy 
 * @returns headers
 */
const chooseCSVParser = async (filesCopy: FileObject[], parsers: any[]): Promise<resultFromParse[]> => {
    const a = await Promise.all(filesCopy.map(async file => {
        return await Promise.all(parsers.map(async parser => {
            const fileName = file.file.name
            try {
                const inputFile = file.data ? file.data.toString().split(',')[1] : ""
                const fileContentBuffer = parser.name === 'getDataNordnet' ? decodeUTF16LE(atob(inputFile)) : b64_to_utf8(inputFile)
                const fileContent = fileContentBuffer.toString()
                const parsedData = await parser(fileContent)
                parsedData.fileName = fileName
                return parsedData
            } catch (e: any) {
                return { Error: e, fileName: fileName }
            }
        }))
    })) as resultFromParse[]
    return a.flatMap(x => x)
}

/**
 * Due to Jest (26.x.x) being the latest stable release, we have to default to commonjs module for tests.
 * The ESM module support through Babel was not sufficient and resulted in different behaviour. 
 * @returns parse function
 */
const loadParser: any = async () => (process.env.NODE_ENV === 'test' ?
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore  
    (await import('csv/dist/cjs/sync.cjs')).parse :
    (await import('csv/dist/esm/sync')).parse
)



export { chooseCSVParser, loadParser }