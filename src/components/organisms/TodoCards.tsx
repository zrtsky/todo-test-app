import { FC } from "react"

import { Loading, Text } from "@nextui-org/react"
import { RiErrorWarningLine } from "react-icons/ri"

import { InfoCard } from "components/atoms"
import { TodoCardsGrid } from "components/molecules"
import { useGetAllTodosQuery } from "services"

export const TodoCards: FC = () => {
  const { data, isLoading, isError } = useGetAllTodosQuery(null)

  if (isError)
    return (
      <InfoCard icon={<RiErrorWarningLine size={30} fill="currentColor" />}>
        <Text size="$lg">Error when try to get todo lists</Text>
      </InfoCard>
    )

  if (isLoading)
    return (
      <InfoCard>
        <Loading>Loading Content</Loading>
      </InfoCard>
    )

  return <TodoCardsGrid todoLists={data} />
}
