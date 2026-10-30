import { prisma as Prisma } from "../config/database.js";

const menuItemSanitizer = (menuItem) => {
    if (!menuItem) return null;
    const { name, description, price, image, category, isVeg } = menuItem;
    return {
        name,
        description,
        price,
        image,
        category,
        isVeg
    };
};


const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, image, category, isVeg, } = req.body;

        if (!name || !description || !price || !image || !category || !isVeg) {
            return res.status(409).json({
                success: true,
                message: "Order Complete details required"
            })
        }
        const isOrderExisting = await Prisma.menuItem.findFirst({
            where: {
                name: name
            }
        })

        if (isOrderExisting) {
            return res.status(409).json({
                message: "Order with such name : Already Exist"
            })
        }
        const newItemCreation = await Prisma.menuItem.create({
            data: {
                name,
                description,
                price,
                image,
                category,
                isVeg
            }
        })
        return res.status(200).json({
            success: true,
            message: "Ordered Created Successfully",
            menuItem: menuItemSanitizer(newItemCreation)
        })
    } catch (error) {
        console.log("Error in createMenuItem " + error)
        return res.status(404).json({
            success: false,
            message: "Error in MenuItem Creation"
        })
    }
}

//Temporary disable delte Menu Item
const deleteMenuItem = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(409).json({
                success: false,
                message: "Menu Item Name required to take actions"
            })
        }

        const isMenuItem = await Prisma.menuItem.findFirst({
            where: {
                name
            }
        })
        if (!isMenuItem) {
            return res.status(409).json({
                success: true,
                message: 'Such Named Item doesnt Exist'
            })
        }

        if (isMenuItem.isDeleted) {
            return res.status(409).json({
                success: false,
                message: "Menu Item is already deleted"
            })
        }

        const deletedItem = await Prisma.menuItem.update({
            where: {
                name: name,
            },
            data: {
                isDeleted: true
            }
        })

        if (!deletedItem) {
            return res.status(409).json({
                success: false,
                message: "Error in Deleteing Menu Item "
            })
        }

        return res.status(200).json({
            success: true,
            message: "Menu Item has been Successfully Delted(Temporarily)",
            menuItem: menuItemSanitizer(deletedItem)
        })
    } catch (error) {
        console.error("Error in Delete MenuItem Controller: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const editMenuitem = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const menuController = {
    createMenuItem, deleteMenuItem
}