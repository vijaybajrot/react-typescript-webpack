/* style.scss declarations */
declare module "*.scss" {
	const content: { [className: string]: string };
	export default content;
}

declare module "*.graphql" {
	const content: any;
	export default content;
}
