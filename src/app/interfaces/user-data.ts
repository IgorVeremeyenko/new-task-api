export interface UserData {
    exec_time: number,
    response: {
        current_page: number,
        from: number,
        last_page: number,
        per_page: number,
        to: number,
        total: number,
        data: [
            {
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
        ]
    }
}
