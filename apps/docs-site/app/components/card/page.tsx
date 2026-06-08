import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@yd-ds/ui";
import { ComponentPreview } from "@/components/component-preview";

export default function CardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Card</h1>
        <p className="mt-2 text-muted-foreground">
          用于分组展示内容与操作的卡片容器。
        </p>
      </div>

      <ComponentPreview title="Example" className="block">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>创建项目</CardTitle>
            <CardDescription>一键部署你的 Design System 文档站。</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              支持 Vercel 部署与 Turborepo 缓存构建。
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">开始</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>
    </div>
  );
}
