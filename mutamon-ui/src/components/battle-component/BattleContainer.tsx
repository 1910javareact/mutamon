import { IState } from "../../reducers";
import { connect } from "react-redux";
import { BattleComponent } from "./BattleComponents";



const mapStateToProps = (state: IState, ownProps: any) =>{
    return{
        user: state.login.user,
        currentMutamon: state.login.currentMutamon
    }
}

export default connect(mapStateToProps)(BattleComponent)