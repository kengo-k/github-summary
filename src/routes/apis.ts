import { Response, Request, Router } from "express";
import config from "../config";
import { callUserRepositoriesQuery } from "../graphql/user_repositories";

const router = Router({ mergeParams: true });

router.get("/active_projects", async (req: Request, res: Response) => {
  const projects = await callUserRepositoriesQuery({ login: config.OWNER });
  // 指定期間内にPUSHされたリポジトリの一覧のみを抽出
  const recentProjects = projects.data.data.user.repositories.nodes.filter(
    (n: any) => {
      return n;
    }
  );
  res.send(recentProjects);
});

export default router;
