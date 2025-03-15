import AuthContainer from './authContainer/AuthContainer'
import styles from './Header.module.scss'
import LinksContainer from './linksContainer/LinksContainer'
import LogoContainer from './logoContainer/LogoContainer'

export default async function Header() {
	return (
		<div className={styles.container}>
			<LogoContainer />
			<LinksContainer />
			<AuthContainer />
		</div>
	)
}
