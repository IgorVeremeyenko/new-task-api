export interface Custom {
    work_order_id: number,
    description: string,
    received_date: Date,
    assigned_to: [
        {
            person_name: string,
            status: string
        }
    ],
    status: string,
    priority: string
}
