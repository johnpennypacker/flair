import { InnerBlocks } from '@wordpress/block-editor';

// @todo: bring the blockProps into scope to capture overlay values.
export default function save( props ) {
	return <InnerBlocks.Content />;
}
