import AccountManager from "./AccountManager"
import AppLauncher from "./AppLauncher"
import Help from "./Help"
import Settings from "./Settings"
import WhatsNew from "./WhatsNew"

const HeaderPanels = () => {

  return (
    <>
      <AppLauncher />
      <AccountManager />
      <Settings/>
      <Help/>
      <WhatsNew/>
    </>
  )
}

export default HeaderPanels