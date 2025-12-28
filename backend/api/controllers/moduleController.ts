import { Request, Response } from "express";
import { ModuleDto } from "../../../shared/moduledto.js";
import { JsonDto } from "../../../shared/jsondto.js";
import Module from "../schema/module.js";

export const post = async (req: Request<{}, {}, ModuleDto>, res: Response<JsonDto<ModuleDto>>) => {
  try {
    let newModule = new Module(req.body);

    newModule.userEmail = req.user!.email;

    const retModule = await newModule.save();

    const dto: ModuleDto = {
      id: retModule._id.toString(),
      name: retModule.name,
      icon: retModule.icon,
      color: retModule.color,
      days: retModule.days,
    };

    res.status(201).json({ data: dto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const patch = async (req: Request<{}, {}, ModuleDto>, res: Response<JsonDto<ModuleDto>>) => {
  try {
    const updated = await Module.findByIdAndUpdate(req.body.id, req.body, { new: true });

    if (!updated) {
      res.status(404).json({ error: "Module not found" });
      return;
    }

    const dto: ModuleDto = {
      id: updated._id.toString(),
      name: updated.name,
      icon: updated.icon,
      color: updated.color,
      days: updated.days,
    };

    res.status(200).json({ data: dto });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const get = async (req: Request, res: Response<JsonDto<ModuleDto[]>>) => {
  try {
    const id = req.query.id;

    if (id) {
      const module = await Module.findById(id);

      if (!module) {
        res.status(404).json({ error: "Module not found" });
        return;
      }

      const dto: ModuleDto = {
        id: module._id.toString(),
        name: module.name,
        icon: module.icon,
        color: module.color,
        days: module.days,
      };

      res.status(200).json({ data: [dto] });
    } else {
      const modules = await Module.find({ userEmail: req.user!.email });

      const dto = modules.map((module) => {
        const ret: ModuleDto = {
          id: module._id.toString(),
          name: module.name,
          icon: module.icon,
          color: module.color,
          days: module.days,
        };
        return ret;
      });

      res.status(200).json({ data: dto });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteModule = async (req: Request, res: Response<JsonDto<any>>) => {
  try {
    const id = req.params.id;

    const deleted = await Module.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ error: "Module not found" });
      return;
    }

    res.status(200).json({});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
