// https://github.com/import-js/eslint-plugin-import/issues/2802
// eslint-disable-next-line import/no-unresolved
import Link from '@docusaurus/Link'
// eslint-disable-next-line import/no-unresolved
import Admonition from '@theme/Admonition'

export const Constructing = () => (
  <div>
    <Admonition type="node">
      <p>
        此页面仍在施工中！<br></br>
        如果你希望我们尽快完成此页面，可以通过 <Link to="/community">社区</Link>
        途径反馈给我们。
      </p>
    </Admonition>
  </div>
)
