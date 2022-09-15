import { FC, ReactNode } from "react"

import { Avatar, Card } from "@nextui-org/react"

interface InfoCardProps {
  children: ReactNode
  icon?: ReactNode
}

const classes = {
  card: {
    minHeight: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBody: { marginBottom: 6 },
}

export const InfoCard: FC<InfoCardProps> = ({ children, icon }) => (
  <Card css={classes.card}>
    <Card.Body>
      {icon && <Avatar squared size="lg" icon={icon} css={classes.cardBody} />}
      {children}
    </Card.Body>
  </Card>
)
