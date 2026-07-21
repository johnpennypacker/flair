/**
 * The block is rendered dynamically on the server (see render.php) so it can be
 * suppressed once dismissed, but its content still needs to be persisted to post
 * content in the normal way so it can be parsed and passed to render.php as
 * `$content`. `InnerBlocks.Content` does that.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 */
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return <InnerBlocks.Content />;
}
