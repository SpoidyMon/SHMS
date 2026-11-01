import { randomBytes } from "node:crypto";
import prisma, { prisma as Prisma } from "../config/database.js"
import { table } from "node:console";

const getTableId = (req) => {
    const id = Number(req.params.id);
    return Number.isInteger(id) && id > 0 ? id : null;
}

const tableSanitizer = (table) => {
    if (!table) return null;

    return {
        id: table.id,
        number: table.number,
        capcity: table.number,
        status: table.status,
        isActive: table.isActive,
        createdAt: table.createdAt,
        updatedAt: table.updatedAt
    }
}


const createTable = async (req, res) => {
    try {
        const { number, capacity } = req.body;
        if (!number || !capacity) {
            return res.status(409).json({
                success: false,
                message: 'Number and capacity required fro the table is required'
            })
        }
        const isTableExisting = await Prisma.table.findUnique({
            where: {
                number
            }
        })
        if (isTableExisting) {
            return res.status(405).json({
                success: false,
                message: 'Table Already Exist'
            })
        }
        const generatedToken = () => randomBytes(16).toString("base64url")
        const newTable = await Prisma.table.create({
            data: {
                number,
                capacity,
                qrToken: generatedToken
            }
        })
        if (!newTable) {
            return res.status(409).json({
                success: false,
                message: "Table Creation failed"
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Table Created Successfully',
            table: tableSanitizer(newTable)
        })
    } catch (error) {
        console.log("Error in createTable Controller " + error)
        return res.status(404).json({
            success: false,
            message: "Failed in Creating a Table  "
        })
    }
}

const listAllTableStatus = async (req, res) => {
    try {
        const allTables = await Prisma.table.findMany({
            select: {
                id: true,
                status: true
            }
        })

        if (!allTables) {
            return res.status(404).json({
                success: true,
                message: "No Tables in DB"
            })
        }

        return res.status(404).json({
            success: true,
            message: "Listed All Tables",
            table: tableSanitizer(allTables)
        })

    } catch (error) {
        console.log("Error in listALlTableStatus " + error)
        return res.status(404).json({
            success: false,
            message: 'Failed in Listing all table status'
        })
    }
}


const updateTable = async (req, res) => {
    try {
        const id = getTableId(req);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "A valid menu item ID is required"
            });
        }

        const { capacity, status, isActive } = req.body;
        const dataToUpdate = {}

        if (capacity !== undefined) {
            if (!Number.isInteger(capacity) || capacity < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Capacity must be a non-negative integer"
                });
            }
            dataToUpdate.capacity = capacity;
        }

        if (status !== undefined) {
            const statusArray = [AVAILABLE,
                OCCUPIED,
                RESERVED,
                OUT_OF_SERVICE]
            if (!statusArray.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Not a valid status"
                });
            }
            dataToUpdate.status = status;
        }

        if (isActive !== undefined) {
            if (typeof isActive !== Boolean || capacity < 0) {
                return res.status(400).json({
                    success: false,
                    message: "isActive must be a True or False"
                });
            }
            dataToUpdate.isActive = isActive;
        }

        if (Object.keys(dataToUpdate).length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required to make update"
            });
        }

        const isTableAlreadyExisting = await Prisma.table.findUnique({
            where: {
                id
            }
        })

        if (isTableAlreadyExisting) {
            return res.status(409).json({
                success: false,
                message: "Table is already Existing"
            })
        }
        const updatedTable = await Prisma.table.update({
            where: {
                id
            },
            data: dataToUpdate
        })

        return res.status(200).json({
            success: true,
            message: "Table Updated Successfully",
            table: tableSanitizer(updatedTable)
        })
    } catch (error) {
        console.log("Error in UpdateTable " + error)
        return res.status(404).json({
            success: false,
            message: 'Failed in updating table '
        })
    }
}

const deactivateTable = async (req, res) => {
    try {
        const id = getTableId(req);

        const isTableExisting = await Prisma.table.findUnique({
            where: {
                id
            }
        })

        if (!isTableExisting) {
            return res.status(409).json({
                success: false,
                message: "Table Doesn't Exist"
            })
        }
        if (!isTableExisting.status === "OUT_OF_SERVICE" || !isTableExisting.isActive) {
            return res.status(409).json({
                success: false,
                message: 'Table already deactivated'
            })
        }

        const deactivatedTable = await Prisma.table.update({
            where: {
                id,
            },
            data: {
                status: "OUT_OF_SERVICE",
                isActive: false
            }
        })
        if (!deactivatedTable) {
            return res.status(404).json({
                success: false,
                message: 'Cant Deactivate User'
            })
        }

        return res.status(200).json({
            success: true,
            message: "Table is Deactivated(OUT OF SEVRICE)",
            table:tableSanitizer(deactivatedTable)
        })

    } catch (error) {
        console.log("Error in deactivateTable " + error)
        return res.status(404).json({
            success: false,
            message: 'Failed in deactivating table '
        })
    }
}

export default tableController = {
    createTable, listAllTableStatus, updateTable,deactivateTable
}