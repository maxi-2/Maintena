export type EventType = {
    name: string,
    id: string,
    due_date: string,
    creator: Profile,
    assignee: Profile,
}

export type profile = {
    id: string,
    role: string,
    profile_name: string
}
