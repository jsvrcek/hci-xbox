export interface Selectable{
    id: string
    key: string
    index?: number
    selection?: Selectable,
    icon?: any
}

export interface Feature extends Selectable {
    name: string
    description?: string
    image_path?: string
}

export interface Game extends Feature{
    pin?: boolean
    store?: boolean
    category: string
}