'use client'

import { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import styles from './Map.module.scss'

const MapContainer = dynamic(
	() => import('react-leaflet').then(mod => mod.MapContainer),
	{ ssr: false }
)
const TileLayer = dynamic(
	() => import('react-leaflet').then(mod => mod.TileLayer),
	{ ssr: false }
)
const Marker = dynamic(
	() => import('react-leaflet/Marker').then(mod => mod.Marker),
	{
		ssr: false,
	}
)
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
	ssr: false,
})

function MapComponent() {
	const position: LatLngExpression = [53.911902, 27.594945]

	return (
		<div className={styles.container}>
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				className={styles.map}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={position}>
					{/* <Popup>Офис компании</Popup> */}
				</Marker>
			</MapContainer>
		</div>
	)
}

export default dynamic(() => Promise.resolve(MapComponent), { ssr: false })
