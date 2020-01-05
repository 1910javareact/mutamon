import { IState } from "../../reducers";
import { connect } from "react-redux";
import { BattleComponent } from "./BattleComponents";
import { updateCurrentMutamon } from "../../action-mappers/login-action-mappers"

const mapStateToProps = (state: IState, ownProps: any) => {
    return {
        user: state.login.user,
        currentMutamon: state.login.currentMutamon
    }
}

const mapDispatchToProps = {
    updateCurrentMutamon
}

export default connect(mapStateToProps, mapDispatchToProps)(BattleComponent)