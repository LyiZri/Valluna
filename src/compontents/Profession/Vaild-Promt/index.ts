import Success from './Success'
import Wrong from './Wrong'

interface VaildPropmtType{
    Success:typeof Success
    Wrong:typeof Wrong

}
const VaildPropmt:VaildPropmtType = {
    Success,
    Wrong
}
export default VaildPropmt