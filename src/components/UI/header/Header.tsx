import AuthContainer from './authContainer/AuthContainer'
import styles from './Header.module.scss'
import LinksContainer from './linksContainer/LinksContainer'

export default async function Header() {
	return (
		<div className={styles.container}>
			<h2>Компания</h2>
			<LinksContainer />
			<AuthContainer />
		</div>
	)
}
