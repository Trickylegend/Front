import Image from 'next/image'
export default function CustomImage({
	id,
	width = 1,
	height = 1,
	alt = `${id}`,
	...rest
}: {
	id: string
	width?: number
	height?: number
	alt?: string
}) {
	const href = `${process.env.NEXT_PUBLIC_API_HOST}/api/images/${id}`
	return <Image src={href} width={width} height={height} alt={alt} {...rest} />
}
