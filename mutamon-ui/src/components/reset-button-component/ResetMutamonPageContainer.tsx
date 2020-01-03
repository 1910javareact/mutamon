import { IState } from "../../reducers"
import { updateCurrentMutamon } from "../../action-mappers/login-action-mappers"
import { connect } from "react-redux"
import { ResetMutamonPageComponent } from "../reset-mutamon-page-component/ResetMutmonPageComponent"


const mapStateToProps = ( state: IState)=>{
    return{
        currentMutamon: state.login.currentMutamon,
    }
}

const mapDispatchToProps = {
    updateCurrentMutamon
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetMutamonPageComponent)