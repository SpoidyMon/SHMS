import { prisma as Prisma } from "../config/database.js";

const menuItemSanitizer = (menuItem) => {
    if (!menuItem) return null;

    return {
        id: menuItem.id,
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
        image: menuItem.image,
        category: menuItem.category ?? null,
        isVeg: menuItem.isVeg,
        isDeleted: menuItem.isDeleted,
        isAvailable: menuItem.isAvailable
    };
};

const menuItemInclude = {
    category: {
        select: {
            id: true,
            name: true
        }
    }
};

const getMenuItemId = (req) => {
    const id = Number(req.params.id);
    return Number.isInteger(id) && id > 0 ? id : null;
};

const createMenuItem = async (req, res) => {
    try {
        const { name, description, price, image, categoryId, isVeg } = req.body ?? {};

        if (
            typeof name !== "string" || !name.trim() ||
            typeof description !== "string" || !description.trim() ||
            !Number.isInteger(price) || price < 0 ||
            typeof image !== "string" || !image.trim() ||
            !Number.isInteger(categoryId) || categoryId <= 0 ||
            !["VegNon", "NONVEG"].includes(isVeg)
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid name, description, price, image, categoryId, and isVeg are required"
            });
        }

        const existingItem = await Prisma.menuItem.findUnique({
            where: { name: name.trim() }
        });

        if (existingItem) {
            return res.status(409).json({
                success: false,
                message: "A menu item with this name already exists"
            });
        }

        const category = await Prisma.category.findUnique({
            where: { id: categoryId },
            select: { id: true }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Selected category does not exist"
            });
        }

        const newMenuItem = await Prisma.menuItem.create({
            data: {
                name: name.trim(),
                description: description.trim(),
                price,
                image: image.trim(),
                isVeg,
                category: {
                    connect: { id: categoryId }
                }
            },
            include: menuItemInclude
        });

        return res.status(201).json({
            success: true,
            message: "Menu item created successfully",
            menuItem: menuItemSanitizer(newMenuItem)
        });
    } catch (error) {
        console.error("Error creating menu item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const id = getMenuItemId(req);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "A valid menu item ID is required"
            });
        }

        const menuItem = await Prisma.menuItem.findUnique({ where: { id } });
        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: "Menu item does not exist"
            });
        }

        if (menuItem.isDeleted) {
            return res.status(409).json({
                success: false,
                message: "Menu item is already deleted"
            });
        }

        const deletedItem = await Prisma.menuItem.update({
            where: { id },
            data: { isDeleted: true },
            include: menuItemInclude
        });

        return res.status(200).json({
            success: true,
            message: "Menu item deleted successfully",
            menuItem: menuItemSanitizer(deletedItem)
        });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const editMenuitem = async (req, res) => {
    try {
        const id = getMenuItemId(req);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "A valid menu item ID is required"
            });
        }

        const { price, description, image } = req.body ?? {};
        const dataToUpdate = {};

        if (price !== undefined) {
            if (!Number.isInteger(price) || price < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price must be a non-negative integer"
                });
            }
            dataToUpdate.price = price;
        }

        if (description !== undefined) {
            if (typeof description !== "string" || !description.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Description must be a non-empty string"
                });
            }
            dataToUpdate.description = description.trim();
        }

        if (image !== undefined) {
            if (typeof image !== "string" || !image.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Image must be a non-empty string"
                });
            }
            dataToUpdate.image = image.trim();
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required to make update"
            });
        }

        const existingItem = await Prisma.menuItem.findUnique({ where: { id } });
        if (!existingItem || existingItem.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Menu item does not exist"
            });
        }

        const updatedMenuItem = await Prisma.menuItem.update({
            where: { id },
            data: dataToUpdate,
            include: menuItemInclude
        });

        return res.status(200).json({
            success: true,
            message: "Menu item updated successfully",
            menuItem: menuItemSanitizer(updatedMenuItem)
        });
    } catch (error) {
        console.error("Error updating menu item:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const isAvailableToggle = async (req, res) => {
    try {
        const id = getMenuItemId(req);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "A valid menu item ID is required"
            });
        }

        const existingItem = await Prisma.menuItem.findUnique({ where: { id } });
        if (!existingItem || existingItem.isDeleted) {
            return res.status(404).json({
                success: false,
                message: "Menu item does not exist"
            });
        }

        const updatedMenuItem = await Prisma.menuItem.update({
            where: { id },
            data: { isAvailable: !existingItem.isAvailable },
            include: menuItemInclude
        });

        return res.status(200).json({
            success: true,
            message: `Menu item is now ${updatedMenuItem.isAvailable ? "available" : "unavailable"}`,
            menuItem: menuItemSanitizer(updatedMenuItem)
        });
    } catch (error) {
        console.error("Error toggling menu item availability:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default menuController = {
    createMenuItem,
    deleteMenuItem,
    editMenuitem,
    isAvailableToggle
};
