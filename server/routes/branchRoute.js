import express from "express";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  getBranchById,
  getAllBranchesByStoreId
} from "../controllers/branchController.js";

const router = express.Router();


router.post('/create-branch', createBranch);
router.patch("/:branchId", updateBranch); 
router.delete("/:branchId", deleteBranch);
router.get("/:branchId", getBranchById);
router.get("/", getAllBranchesByStoreId);

export default router;
