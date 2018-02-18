import { env } from "pri"
import * as React from "react"

export default () => (
  <div>
    <h1
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      Welcome to pri!
    </h1>
    <p style={{ padding: "10 50px" }}>
      Current env: {env.isLocal && "local"}
      {env.isProd && "prod"}
    </p>
  </div>
)
