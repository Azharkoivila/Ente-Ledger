import accountRepository from "@/src/utils/db/repository/accountRepository";
import { withObservables } from "@nozbe/watermelondb/react";
import WithAnimation from "../hoc/withAnimation";
import SettingsModule from "../modules/settings";
const AnimatedSettings = WithAnimation(SettingsModule);
const observableUser = withObservables([], () => ({
  user: accountRepository.observeUser(),
}))(AnimatedSettings);
export default observableUser;
//! rr type
