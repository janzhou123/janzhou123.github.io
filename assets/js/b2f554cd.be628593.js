"use strict";(self.webpackChunkjanzhou_123_github_io=self.webpackChunkjanzhou_123_github_io||[]).push([[1477],{10:n=>{n.exports=JSON.parse('{"blogPosts":[{"id":"nestjs-config-@nestjs/config","metadata":{"permalink":"/blog/nestjs-config-@nestjs/config","source":"@site/blog/Nestjs-Base/Nestjs\u57fa\u7840\u914d\u7f6e-@nextjs.md","title":"Nestjs\u57fa\u7840\u914d\u7f6e-@nestjs/config","description":"Nestjs\u57fa\u7840\u914d\u7f6e-@nestjs/config","date":"2022-09-25T00:00:00.000Z","formattedDate":"September 25, 2022","tags":[{"label":"Nestjs","permalink":"/blog/tags/nestjs"},{"label":"nestjs/config","permalink":"/blog/tags/nestjs-config"}],"readingTime":1.845,"hasTruncateMarker":false,"authors":[{"name":"Zhouxiaoxiao","title":"\u575a\u6301\u5b66\u4e60\uff0c\u575a\u6301\u8fdb\u6b65","url":"https://github.com/janzhou123","imageURL":"https://github.com/janzhou123.png","key":"zxx"}],"frontMatter":{"slug":"nestjs-config-@nestjs/config","title":"Nestjs\u57fa\u7840\u914d\u7f6e-@nestjs/config","date":"2022-09-25T00:00:00.000Z","authors":"zxx","tags":["Nestjs","nestjs/config"],"keywords":["Nestjs","nestjs/config"],"description":"Nestjs\u57fa\u7840\u914d\u7f6e-@nestjs/config"},"nextItem":{"title":"Git\u5e38\u7528\u547d\u4ee4","permalink":"/blog/git-basic-usage"}},"content":"\u901a\u5e38\u6211\u4eec\u5efa\u7acb\u540e\u53f0\u5e94\u7528\u7a0b\u5e8f\u7684\u65f6\u5019\uff0c\u662f\u9700\u8981\u63d0\u524d\u914d\u7f6e\u4e00\u4e9b\u5de5\u7a0b\u53c2\u6570\uff0c\u4f8b\u5982\u6570\u636e\u5e93\u5730\u5740\\\\\u7528\u6237\u540d\u5bc6\u7801\uff0credis \u5730\u5740\\\\\u5bc6\u7801\u7b49\u7b49\uff0c\u672c\u7bc7\u6587\u7ae0\u5c06\u4ecb\u7ecd Nestjs \u5b98\u65b9\u6307\u5b9a\u7684\u914d\u7f6e\u65b9\u5f0f`@nestjs/config`\u3002\\n\\n:::tip \u63d0\u793a\\n\u8fd9\u91cc\u5047\u5b9a\u4f60\u5df2\u7ecf\u5efa\u7acb\u4e00\u4e2a Nestjs \u5de5\u7a0b\uff0c\u5982\u679c\u6ca1\u6709\u8bf7\u6267\u884c\u5982\u4e0b\u547d\u4ee4\uff1a\\n\\nnest new config-demo\\n:::\\n\\n\u8fdb\u5165\u5de5\u7a0b\u76ee\u5f55,\u6267\u884c\u547d\u4ee4,\u5b89\u88c5@nestjs/config\uff1a\\n\\n```ts\\npnpm add @nestjs/config\\n```\\n\\n\u5b89\u88c5\u5b8c\u6210\u540e\uff0c\u6211\u4eec\u5728\u548c`package.json`\u540c\u7ea7\u522b\u7684\u76ee\u5f55\u4e0a\u65b0\u5efa`.env`\u6587\u4ef6\\n\\n```ts title=\'.env\' showLineNumbers\\nDB_TYPE=MYSQL\\nDB_URL=http://localhost:3306\\nDB_USER=root\\nDB_PWD=root\\n```\\n\\n\u540c\u65f6\u6211\u4eec\u4fee\u6539`app.module.ts`\u6587\u4ef6\uff0c\u5f15\u5165`ConfigModule`,\u5e76\u5c06`isGlobal`\u8bbe\u7f6e\u4e3a`true`\uff0c\u8ba9`ConfigModule`\u53ef\u4ee5\u5168\u5c40\u4f7f\u7528\u3002\\n\\n```ts {4,8-10} title=\'app.module.ts\' showLineNumbers\\nimport { Module } from \\"@nestjs/common\\";\\nimport { AppController } from \\"./app.controller\\";\\nimport { AppService } from \\"./app.service\\";\\nimport { ConfigModule } from \\"@nestjs/config\\";\\n\\n@Module({\\n  imports: [\\n    ConfigModule.forRoot({\\n      isGlobal: true,\\n    }),\\n  ],\\n  controllers: [AppController],\\n  providers: [AppService],\\n})\\nexport class AppModule {}\\n```\\n\\n\u63a5\u4e0b\u6765\u6211\u4eec\u4fee\u6539`app.controller.ts`,\u5e76\u5728\u6784\u9020\u51fd\u6570\u4e2d\u5f15\u5165`ConfigService`\uff0c\u6211\u4eec\u65b0\u589e\u4e00\u4e2a API\uff0c\u5728 API \u91cc\u9762\u89e3\u6790\u51fa`.env`\u91cc\u9762\u7684\u53c2\u6570\u5e76\u5c06\u53c2\u6570\u8fd4\u56de\u3002\\n\\n```ts {3,8-10,12-21} title=\'app.controller.ts\' showLineNumbers\\nimport { Controller, Get } from \\"@nestjs/common\\";\\nimport { AppService } from \\"./app.service\\";\\nimport { ConfigService } from \\"@nestjs/config\\";\\n\\n@Controller()\\nexport class AppController {\\n  constructor(\\n    private readonly appService: AppService,\\n    private readonly configService: ConfigService\\n  ) {}\\n\\n  @Get(\'config\')\\n  getConfig(): any {\\n    const config = {\\n      dbType: this.configService.get(\\"DB_TYPE\\"),\\n      dbUrl: this.configService.get(\\"DB_URL\\"),\\n      dbUser: this.configService.get(\\"DB_USER\\"),\\n      dbPwd: this.configService.get(\\"DB_PWD\\"),\\n    };\\n    return config;\\n  }\\n}\\n```\\n\\n\u542f\u52a8\u5e94\u7528\u7a0b\u5e8f\uff0c\u5e76\u8bf7\u6c42 API \u63a5\u53e3[http://localhost:3000/config](http://localhost:3000/config), \u5f97\u5230\u6570\u636e\u914d\u7f6e\u4fe1\u606f\u3002\u81f3\u6b64`@nestjs/config`\u7684\u57fa\u672c\u4f7f\u7528\u4ecb\u7ecd\u5b8c\u6bd5\u3002\\n\\n```json showLineNumbers\\n{\\n  \\"dbType\\": \\"MYSQL\\",\\n  \\"dbUrl\\": \\"http://localhost:3306\\",\\n  \\"dbUser\\": \\"root\\",\\n  \\"dbPwd\\": \\"root\\"\\n}\\n```"},{"id":"git-basic-usage","metadata":{"permalink":"/blog/git-basic-usage","source":"@site/blog/2022-04-29-Git\u57fa\u7840\u4f7f\u7528.md","title":"Git\u5e38\u7528\u547d\u4ee4","description":"\u4e00\u4e9b\u5e38\u7528\u7684\u547d\u4ee4\u5982\u4e0b\uff0c\u4e0d\u7b97\u5168\u9762\u4f46\u662f\u65e5\u5e38\u5bf9\u6211\u6765\u8bf4\u662f\u591f\u7528\u4e86\u3002","date":"2022-04-29T00:00:00.000Z","formattedDate":"April 29, 2022","tags":[{"label":"Git","permalink":"/blog/tags/git"},{"label":"\u6280\u672f","permalink":"/blog/tags/\u6280\u672f"}],"readingTime":13.48,"hasTruncateMarker":true,"authors":[{"name":"Zhouxiaoxiao","title":"\u575a\u6301\u5b66\u4e60\uff0c\u575a\u6301\u8fdb\u6b65","url":"https://github.com/janzhou123","imageURL":"https://github.com/janzhou123.png","key":"zxx"}],"frontMatter":{"slug":"git-basic-usage","title":"Git\u5e38\u7528\u547d\u4ee4","authors":"zxx","tags":["Git","\u6280\u672f"]},"prevItem":{"title":"Nestjs\u57fa\u7840\u914d\u7f6e-@nestjs/config","permalink":"/blog/nestjs-config-@nestjs/config"}},"content":"> \u4e00\u4e9b\u5e38\u7528\u7684\u547d\u4ee4\u5982\u4e0b\uff0c\u4e0d\u7b97\u5168\u9762\u4f46\u662f\u65e5\u5e38\u5bf9\u6211\u6765\u8bf4\u662f\u591f\u7528\u4e86\u3002\\n\\n- `git clone url` \uff1a\u514b\u9686\u9879\u76ee\uff0c\u5982\u9700\u81ea\u5b9a\u4e49\u672c\u5730\u6587\u4ef6\u5939\u7684\u540d\u79f0\uff0c\u5728 url \u4e4b\u540e\u52a0\u4e2a\u540d\u79f0\u5373\u53ef\u3002\\n- `git add` \uff1a\u8fd9\u662f\u4e2a\u591a\u529f\u80fd\u547d\u4ee4\uff0c\u53ef\u4ee5\u7528\u5b83\u5f00\u59cb\u8ddf\u8e2a\u65b0\u6587\u4ef6\uff0c\u6216\u8005\u628a\u5df2\u8ddf\u8e2a\u7684\u53d1\u751f\u66f4\u6539\u7684\u6587\u4ef6\u653e\u5230\u6682\u5b58\u533a\uff0c\u8fd8\u80fd\u7528\u4e8e\u5408\u5e76\u65f6\u628a\u6709\u51b2\u7a81\u7684\u6587\u4ef6\u6807\u8bb0\u4e3a\u5df2\u89e3\u51b3\u72b6\u6001\u7b49\u3002\\n- `git rm` \uff1a\u8981\u4ece Git \u4e2d\u79fb\u9664\u67d0\u4e2a\u6587\u4ef6\uff0c\u5c31\u5fc5\u987b\u8981\u4ece\u6682\u5b58\u533a\u57df\u79fb\u9664\uff0c\u7136\u540e\u63d0\u4ea4\u3002\u53ef\u4ee5\u7528 `git rm` \u5b8c\u6210\uff0c\u5e76\u8fde\u5e26\u4ece\u5de5\u4f5c\u76ee\u5f55\u4e2d\u5220\u9664\u6307\u5b9a\u7684\u6587\u4ef6\uff0c\u8fd9\u6837\u4ee5\u540e\u5c31\u4e0d\u4f1a\u51fa\u73b0\u5728\u672a\u8ddf\u8e2a\u6587\u4ef6\u6e05\u5355\u4e2d\u4e86\u3002\\n- `git diff` \uff1a\u67e5\u770b\u5c1a\u672a\u6682\u5b58\u7684\u6587\u4ef6\u66f4\u65b0\u4e86\u54ea\u4e9b\u90e8\u5206\u3002\u5728\u540e\u9762\u52a0\u4e00\u4e2a `--staged` \u53c2\u6570\uff0c\u5c06\u6bd4\u5bf9\u5df2\u6682\u5b58\u6587\u4ef6\u4e0e\u6700\u540e\u4e00\u6b21\u63d0\u4ea4\u7684\u6587\u4ef6\u5dee\u5f02\u3002\\n\x3c!--truncate--\x3e\\n- `git status` \uff1a\u67e5\u770b\u54ea\u4e9b\u6587\u4ef6\u5904\u4e8e\u4ec0\u4e48\u72b6\u6001\u3001\u5f53\u524d\u6240\u5728\u5206\u652f\u3002\\n- `git commit -m \\"msg\\"` \uff1a\u63d0\u4ea4\uff0c`-m` \u53c2\u6570\u53ef\u5c06\u63d0\u4ea4\u4fe1\u606f\u5728\u540e\u9762\u9644\u4e0a\u3002\u63d0\u4ea4\u65f6\u8bb0\u5f55\u7684\u662f\u653e\u5728\u6682\u5b58\u533a\u57df\u7684\u5feb\u7167\u3002 \u4efb\u4f55\u8fd8\u672a\u6682\u5b58\u6587\u4ef6\u7684\u4ecd\u7136\u4fdd\u6301\u5df2\u4fee\u6539\u72b6\u6001\uff0c\u53ef\u4ee5\u5728\u4e0b\u6b21\u63d0\u4ea4\u65f6\u7eb3\u5165\u7248\u672c\u7ba1\u7406\u3002\\n- `git log` \uff1a\u67e5\u770b\u63d0\u4ea4\u5386\u53f2\u3002\\n- `git reset` \uff1a\u64a4\u9500\u64cd\u4f5c\u3002\\n- `git remote` \uff1a\u67e5\u770b\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u53ef\u4f7f\u7528 `-v` \u67e5\u770b\u66f4\u8be6\u7ec6\u4fe1\u606f\u3002\\n- `git fetch <remote>` \uff1a\u4ece\u8fdc\u7a0b\u4ed3\u5e93\u62c9\u53d6\u6570\u636e\u3002\\n\\n## \u4e00\u3001\u901a\u8fc7SSH\u65b9\u5f0f\u4f7f\u7528GitLab\\n### \u521b\u5efaSSH\u79c1\u94a5\u548c\u516c\u94a5\\n`ssh-keygen -t` \u751f\u6210\u5bc6\u94a5\uff0c-t \u53c2\u6570\u540e\u9762\u8ddf\u7740\u52a0\u5bc6\u7c7b\u578b\\n```bash\\nssh-keygen -t ed25519\\n```\\n\u751f\u6210\u4e4b\u540e\uff0c`.pub` \u540e\u7f00\u7684\u6587\u4ef6\u5373\u662f\u516c\u94a5\u6587\u4ef6\uff0c\u65e0\u540e\u7f00\u540d\u7684\u5219\u662f\u79c1\u94a5\u6587\u4ef6\\n\\n### \u9a8c\u8bc1\u8eab\u4efd\\n`-T` \u53c2\u6570\u4e3a `\u4e0d\u663e\u793a\u7ec8\u7aef\uff0c\u53ea\u663e\u793a\u8fde\u63a5\u6210\u529f\u4fe1\u606f`\\n```\\nssh -T git@gitlab.com\\n```\\n\u4e4b\u540e\u5c31\u53ef\u4ee5\u4f7f\u7528ssh\u5730\u5740\u514b\u9686\u9879\u76ee\u4e86\\n\\n## \u4e8c\u3001\u66f4\u6539\u4ed3\u5e93\u5730\u5740\\n\\n\u57fa\u672c\u77e5\u8bc6\uff1a\\n- `git remote` \u67e5\u770b\u6240\u6709\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u52a0\u4e0a `-v` \u5219\u663e\u793a\u8be6\u7ec6\u4fe1\u606f\uff08\u5305\u62ec\u6240\u6709\u4ed3\u5e93\u7684\u5730\u5740\uff09\\n- `git remote get-url origin` \u67e5\u770b origin \u7684\u8fdc\u7a0b\u4ed3\u5e93\u5730\u5740\\n- `git remote set-url [--push] <name> <newurl> [<oldurl>]`\\n```bash\\ngit remote set-url origin https://xxxxx.git\\n```\\n## \u4e09\u3001\u64a4\u9500\u64cd\u4f5c\\n### \u4fee\u8865\u63d0\u4ea4\\n\u6709\u65f6\u5019\u6211\u4eec\u63d0\u4ea4\u5b8c\u4e86\u624d\u53d1\u73b0\u6f0f\u6389\u4e86\u51e0\u4e2a\u6587\u4ef6\u6ca1\u6709\u6dfb\u52a0\uff0c\u6216\u8005\u63d0\u4ea4\u4fe1\u606f\u5199\u9519\u4e86\u3002\u53ef\u5728\u4fee\u6539\u6216\u6dfb\u52a0\u540e\uff0cadd\u5230\u6682\u5b58\u533a\uff0c\u7136\u540e\u4f7f\u7528 `git commit --amend` \u6765\u4fee\u6b63\u63d0\u4ea4\u3002\u5c31\u50cf\u4e0b\u9762\u4e00\u6837\uff1a\\n```bash\\ngit commit -m \'initial commit\'\\ngit add forgotten_file\\ngit commit --amend\\n```\\n\u5982\u679c\u5355\u4f7f\u7528 `--amend` \u53c2\u6570\uff0c\u4f1a\u6253\u5f00 vim \u7136\u540e\u5728\u91cc\u9762\u4fee\u6539\u4e0a\u6b21\u7684 commit \u6d88\u606f\u3002\u5982\u679c\u8fd8\u4f7f\u7528\u4e86 `-m` \u90a3\u5c31\u5728\u540e\u9762\u76f4\u63a5\u5199\u4e0a\u63d0\u4ea4\u6d88\u606f\uff0c\u7136\u540e\u63d0\u4ea4\u4e86\u3002\\n\\n### \u53d6\u6d88\u6682\u5b58\u7684\u6587\u4ef6\\n\u6682\u5b58\u4e86\u591a\u4f59\u7684\u6587\u4ef6\uff0c\u5982\u4f55\u53d6\u6d88\u5462\uff0c\u4f7f\u7528 `git reset HEAD <file>` \u6765\u64a4\u9500\u5bf9\u8be5\u6587\u4ef6\u7684\u6682\u5b58\u3002\u5728 VSCode \u4e2d\u53ef\u4ee5\u901a\u8fc7\u70b9\u51fb Unstage Changes \u5b9e\u73b0\uff0c\u800c Discard Changes \u5b9e\u9645\u4e0a\u662f\u4e0b\u9762\u8981\u8bf4\u7684 **\u6062\u590d\u5230\u4e0a\u6b21\u63d0\u4ea4\u7684\u6837\u5b50**\u3002\\n\\n### \u6062\u590d\u5230\u4e0a\u6b21\u63d0\u4ea4\u7684\u6837\u5b50\\n\u5bf9\u4e8e\u5df2\u8ffd\u8e2a\u4f46\u672a\u6682\u5b58\u7684\u6587\u4ef6\uff0c\u6bd4\u5982\u4f60\u6539\u4e86\u4e00\u5806\u4ee3\u7801\u7136\u540e\u53d1\u73b0\u4e0d\u6ee1\u610f\uff0c\u60f3\u8981\u56de\u5230\u4e4b\u524d\u7684\u6837\u5b50(\u6700\u540e\u4e00\u6b21\u63d0\u4ea4)\uff0c\u4f7f\u7528 `git checkout -- <file>` \u5373\u53ef\u3002\\n\\n### \u64a4\u9500\u63d0\u4ea4\\n\u4ee3\u7801\u63d0\u4ea4\u4e86\u4f46\u662f\u53c8\u540e\u6094\u4e86\uff0c\u60f3\u8981\u91cd\u65b0\u7f16\u8f91\u4e00\u4e0b\u63d0\u4ea4\u4fe1\u606f\uff0c\u5efa\u8bae\u4f7f\u7528\u4fee\u8865\u63d0\u4ea4\u7684\u65b9\u6cd5\uff0c\u5373\u4f7f\u7528 `--amend` \u53c2\u6570\u4fee\u8865\u63d0\u4ea4\u4e00\u4e0b\u3002\\n\\n\u5f53\u7136\uff0c\u4e5f\u53ef\u4ee5\u4f7f\u7528 `git reset --soft HEAD^` \u76f4\u63a5\u64a4\u9500 commit\u3002\u5176\u4e2d `HEAD` \u662f\u6307\u9488\uff0c`HEAD^` \u548c `HEAD~1` \u6307\u5411\u4e0a\u4e00\u6b21\u63d0\u4ea4\uff0c`HEAD^^` \u548c `HEAD~2` \u6307\u5411\u4e0a\u4e0a\u6b21\u63d0\u4ea4\u3002\\n\\nreset \u7684\u51e0\u4e2a\u53c2\u6570\uff1a\\n\\n1. \u4f7f\u7528\u53c2\u6570--mixed(\u9ed8\u8ba4\u53c2\u6570)\uff0c\u5c06\u64a4\u9500\u63d0\u4ea4\uff0c\u64a4\u9500\u6682\u5b58\uff0c\u4fdd\u7559\u5de5\u4f5c\u533a\u6539\u52a8\u7684\u4ee3\u7801\\n2. \u4f7f\u7528\u53c2\u6570--soft\uff0c\u5c06\u64a4\u9500\u63d0\u4ea4\uff0c\u4e0d\u64a4\u9500\u6682\u5b58\uff0c\u4fdd\u7559\u5de5\u4f5c\u533a\u6539\u52a8\u7684\u4ee3\u7801\\n3. \u4f7f\u7528\u53c2\u6570--hard\uff0c\u5c06\u64a4\u9500\u63d0\u4ea4\uff0c\u64a4\u9500\u6682\u5b58\uff0c\u5220\u9664\u5de5\u4f5c\u533a\u6539\u52a8\u7684\u4ee3\u7801\\n\\n## \u56db\u3001\u8fdc\u7a0b\u4ed3\u5e93\u4f7f\u7528\\n\\n### \u6dfb\u52a0\u8fdc\u7a0b\u4ed3\u5e93\\n\u5982\u679c\u4e00\u4efd\u4ee3\u7801\uff0c\u5206\u5e03\u5230\u591a\u4e2agit\u4ed3\u5e93\uff0c\u5c31\u53ef\u4ee5\u6dfb\u52a0\u591a\u4e2a\u4ed3\u5e93\u3002\u6216\u591a\u4eba\u534f\u4f5c\u65f6\uff0c\u65b9\u4fbf\u62c9\u53d6\u548c\u63a8\u9001\u522b\u4eba\u7684\u4ee3\u7801\u3002\\n```bash\\ngit remote add cxlab https://gitlab.com/cx_x/meoo-space.git\\n```\\n\\n### \u63a8\u9001\u5230\u8fdc\u7a0b\u4ed3\u5e93\\n\u5c06\u672c\u5730\u7684\u4e00\u4efd\u4ee3\u7801\u63a8\u9001\u5230\u4e0d\u540c\u7684\u4ed3\u5e93\u4e2d\uff0c\u4f8b\u5982\u5c06\u672c\u535a\u5ba2\u7684 main \u5206\u652f\u63a8\u9001\u5230 cxlab \u670d\u52a1\u5668\u3002\\n```bash\\ngit push cxlab main\\n```\\n\\n### \u62c9\u53d6\u66f4\u65b0\\n`git fetch` + `git merge` = `git pull`\uff1b\\n\\nfetch \u547d\u4ee4\u4f1a\u8bbf\u95ee\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u4ece\u4e2d\u62c9\u53d6\u6240\u6709\u4f60\u8fd8\u6ca1\u6709\u7684\u6570\u636e\u3002\u6267\u884c\u5b8c\u6210\u540e\uff0c\u4f60\u5c06\u4f1a\u62e5\u6709\u90a3\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\u6240\u6709\u5206\u652f\u7684**\u5f15\u7528**\uff0c\u53ef\u4ee5\u968f\u65f6\u5408\u5e76\u6216\u67e5\u770b\u3002\u5b83\u5e76\u4e0d\u4f1a\u81ea\u52a8\u5408\u5e76\u6216\u4fee\u6539\u4f60\u5f53\u524d\u7684\u5de5\u4f5c\uff0c\u5fc5\u987b\u624b\u52a8\u5408\u5e76\u4ee3\u7801\u3002\\n\\n### \u8fdc\u7a0b\u4ed3\u5e93\u91cd\u547d\u540d\u548c\u5220\u9664\\n\u5c06 cxlab \u91cd\u547d\u540d\u4e3a gtlab\\n```bash\\ngit remote rename cxlab gtlab\\n```\\n\\n\u5c06 gtlab \u8fdc\u7a0b\u4ed3\u5e93\u4ece\u672c\u5730\u5220\u9664\\n```bash\\ngit remote remove gtlab\\n```\\n\u4e00\u65e6\u4f60\u4f7f\u7528\u8fd9\u79cd\u65b9\u5f0f\u5220\u9664\u4e86\u4e00\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u90a3\u4e48\u6240\u6709\u548c\u8fd9\u4e2a\u8fdc\u7a0b\u4ed3\u5e93\u76f8\u5173\u7684\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f\u4ee5\u53ca\u914d\u7f6e\u4fe1\u606f\u4e5f\u4f1a\u4e00\u8d77\u88ab\u5220\u9664\u3002\\n\\n## \u4e94\u3001\u6253\u6807\u7b7e\\n> \u53ef\u4ee5\u7ed9\u4ed3\u5e93\u5386\u53f2\u4e2d\u7684\u67d0\u4e00\u4e2a\u63d0\u4ea4\u6253\u4e0a\u6807\u7b7e\uff0c\u4ee5\u793a\u91cd\u8981\u3002 \u6bd4\u8f83\u6709\u4ee3\u8868\u6027\u7684\u662f\u4eba\u4eec\u4f1a\u4f7f\u7528\u8fd9\u4e2a\u529f\u80fd\u6765\u6807\u8bb0\u53d1\u5e03\u7ed3\u70b9\uff08 v1.0 \u3001 v2.0 \u7b49\u7b49\uff09\u3002\\n\\n\u4f7f\u7528 `git tag` \u5217\u51fa\u6240\u6709\u6807\u7b7e\uff0c\u6309\u7167\u901a\u914d\u7b26\u5217\u51fa\u6807\u7b7e\u9700\u8981 -l \u6216 --list \u9009\u9879\uff0c\u4f8b\u5982 `git tag -l \\"v1.8.5*\\"`\u3002\\n\\n### \u6dfb\u52a0\u6807\u7b7e\\n\u5728 GitHub \u4e2d release \u4e00\u4e2a\u7248\u672c\u7684\u4ee3\u7801\u6216\u8005\u5b89\u88c5\u5305\u7684\u65f6\u5019\uff0c\u5c31\u9700\u8981\u521b\u5efa\u6216\u8005\u9009\u62e9\u4e00\u4e2a tag\u3002\\n> Git \u652f\u6301\u4e24\u79cd\u6807\u7b7e\uff1a\u8f7b\u91cf\u6807\u7b7e\uff08lightweight\uff09\u4e0e\u9644\u6ce8\u6807\u7b7e\uff08annotated\uff09\u3002\\n> \\n> \u8f7b\u91cf\u6807\u7b7e\u5f88\u50cf\u4e00\u4e2a\u4e0d\u4f1a\u6539\u53d8\u7684\u5206\u652f\u2014\u2014\u5b83\u53ea\u662f\u67d0\u4e2a\u7279\u5b9a\u63d0\u4ea4\u7684\u5f15\u7528\u3002\\n> \\n> \u800c\u9644\u6ce8\u6807\u7b7e\u662f\u5b58\u50a8\u5728 Git \u6570\u636e\u5e93\u4e2d\u7684\u4e00\u4e2a\u5b8c\u6574\u5bf9\u8c61\uff0c \u5b83\u4eec\u662f\u53ef\u4ee5\u88ab\u6821\u9a8c\u7684\uff0c\u5176\u4e2d\u5305\u542b\u6253\u6807\u7b7e\u8005\u7684\u540d\u5b57\u3001\u7535\u5b50\u90ae\u4ef6\u5730\u5740\u3001\u65e5\u671f\u65f6\u95f4\uff0c \u6b64\u5916\u8fd8\u6709\u4e00\u4e2a\u6807\u7b7e\u4fe1\u606f\uff0c\u5e76\u4e14\u53ef\u4ee5\u4f7f\u7528 GNU Privacy Guard \uff08GPG\uff09\u7b7e\u540d\u5e76\u9a8c\u8bc1\u3002 \u901a\u5e38\u4f1a\u5efa\u8bae\u521b\u5efa\u9644\u6ce8\u6807\u7b7e\uff0c\u8fd9\u6837\u4f60\u53ef\u4ee5\u62e5\u6709\u4ee5\u4e0a\u6240\u6709\u4fe1\u606f\u3002\u4f46\u662f\u5982\u679c\u4f60\u53ea\u662f\u60f3\u7528\u4e00\u4e2a\u4e34\u65f6\u7684\u6807\u7b7e\uff0c \u6216\u8005\u56e0\u4e3a\u67d0\u4e9b\u539f\u56e0\u4e0d\u60f3\u8981\u4fdd\u5b58\u8fd9\u4e9b\u4fe1\u606f\uff0c\u90a3\u4e48\u4e5f\u53ef\u4ee5\u7528\u8f7b\u91cf\u6807\u7b7e\u3002\\n\\n```bash\\ngit tag v1.4 #\u8f7b\u91cf\u6807\u7b7e\\ngit tag -a v1.4 -m \\"my version 1.4\\" #\u9644\u6ce8\u6807\u7b7e\\n```\\n\u5982\u679c\u60f3\u8981\u7ed9\u4ee5\u524d\u7684\u67d0\u4e2a\u63d0\u4ea4\u8865\u6253\u6807\u7b7e\uff1a\\n```bash\\ngit log --pretty=oneline #\u8f93\u51fa\u6240\u6709\u63d0\u4ea4\\ngit tag -a v1.2 9fceb02 #\u5bf9\u7279\u5b9a\u7684\u63d0\u4ea4\u8865\u6253\u4e00\u4e2atag\\n```\\n\\n### \u63a8\u9001\u6807\u7b7e\\n`git push` \u5e76\u4e0d\u4f1a\u628a\u6807\u7b7e\u63a8\u9001\u5230\u8fdc\u7a0b\u4ed3\u5e93\u670d\u52a1\u5668\u4e0a\uff0c\u5728\u521b\u5efa\u5b8c\u6807\u7b7e\u540e\u5fc5\u987b\u663e\u5f0f\u5730\u63a8\u9001\u5230\u670d\u52a1\u5668\u3002\u53ef\u4ee5\u8fd0\u884c `git push origin <tagname>`\u3002\u5982\u679c\u60f3\u8981\u4e00\u6b21\u6027\u63a8\u9001\u5f88\u591a\u6807\u7b7e\uff0c\u4e5f\u53ef\u4ee5\u4f7f\u7528 `git push --tags` \u547d\u4ee4\uff0c\u5c06\u628a\u6240\u6709\u4e0d\u5728\u8fdc\u7a0b\u4ed3\u5e93\u670d\u52a1\u5668\u4e0a\u7684\u6807\u7b7e\u5168\u90e8\u63a8\u9001\u3002\\n\\n### \u5220\u9664\u6807\u7b7e\\n\\n\u8981\u5220\u9664\u6389\u4f60\u672c\u5730\u4ed3\u5e93\u4e0a\u7684\u6807\u7b7e\uff0c\u53ef\u4ee5\u4f7f\u7528\u547d\u4ee4\uff1a\\n```bash\\ngit tag -d <tagname>\\n```\\n\u540c\u65f6\u5220\u9664\u8fdc\u7a0b\u5206\u4ed3\u5e93\u4e2d\u7684\u8be5\u6807\u7b7e\uff1a\\n```bash\\ngit push origin --delete <tagname>\\n```\\n\\n## \u516d\u3001\u5206\u652f\u64cd\u4f5c\\n`git branch` \u547d\u4ee4\u4e0d\u53ea\u662f\u53ef\u4ee5\u521b\u5efa\u4e0e\u5220\u9664\u5206\u652f\u3002\u5982\u679c\u4e0d\u52a0\u4efb\u4f55\u53c2\u6570\u8fd0\u884c\u5b83\uff0c\u4f1a\u5f97\u5230\u5f53\u524d\u6240\u6709\u5206\u652f\u7684\u4e00\u4e2a\u5217\u8868\u3002\\n\\n### \u521b\u5efa\u5206\u652f\\n\u521b\u5efa\u4e00\u4e2a `mybranch` \u5206\u652f\\n```bash\\ngit branch mybranch\\n```\\n\\n### \u5207\u6362\u5206\u652f\\n\u5728\u5207\u6362\u5206\u652f\u65f6\uff0c\u4e00\u5b9a\u8981\u6ce8\u610f\u4f60\u5de5\u4f5c\u76ee\u5f55\u91cc\u7684\u6587\u4ef6\u4f1a\u88ab\u6539\u53d8\u3002 \u5982\u679c\u662f\u5207\u6362\u5230\u4e00\u4e2a\u8f83\u65e7\u7684\u5206\u652f\uff0c\u4f60\u7684\u5de5\u4f5c\u76ee\u5f55\u4f1a\u6062\u590d\u5230\u8be5\u5206\u652f\u6700\u540e\u4e00\u6b21\u63d0\u4ea4\u65f6\u7684\u6837\u5b50\u3002\\n\\n\u5207\u6362\u5230 `mybranch` \u5206\u652f\\n```bash\\ngit checkout mybranch\\n```\\n\u521b\u5efa\u5e76\u5207\u6362\u5230 `newbranch` \u5206\u652f\\n```bash\\ngit checkout -b newbranch\\n```\\n\\n### \u5408\u5e76\u5206\u652f\\n\u56de\u5230 master \u5206\u652f\uff0c\u5c06 hotfix \u5206\u652f\u5408\u5e76\u8fdb\u6765\\n```bash\\ngit checkout master\\ngit merge hotfix #\u9ed8\u8ba4fast-forward\\n```\\n\u5f53\u5408\u5e76\u9047\u5230\u51b2\u7a81\u65f6\uff0c\u53ef\u7528 `git status` \u67e5\u770b\u51b2\u7a81\uff0c\u624b\u52a8\u89e3\u51b3\u51b2\u7a81\u540e\uff0c\u4f7f\u7528 `git add` \u547d\u4ee4\u6765\u5c06\u5176\u6807\u8bb0\u4e3a\u51b2\u7a81\u5df2\u89e3\u51b3\u3002\u4e00\u65e6\u6682\u5b58\u8fd9\u4e9b\u539f\u672c\u6709\u51b2\u7a81\u7684\u6587\u4ef6\uff0cGit \u5c31\u4f1a\u5c06\u5b83\u4eec\u6807\u8bb0\u4e3a\u51b2\u7a81\u5df2\u89e3\u51b3\u3002\u5982\u679c\u5bf9\u7ed3\u679c\u611f\u5230\u6ee1\u610f\uff0c\u5e76\u4e14\u786e\u5b9a\u4e4b\u524d\u6709\u51b2\u7a81\u7684\u7684\u6587\u4ef6\u90fd\u5df2\u7ecf\u6682\u5b58\u4e86\uff0c\u8fd9\u65f6\u4f60\u53ef\u4ee5\u8f93\u5165 `git commit` \u6765\u5b8c\u6210\u5408\u5e76\u63d0\u4ea4\u3002\u4e0b\u56fe\u4e3a merge \u7684\u4e09\u79cd\u65b9\u5f0f\u533a\u522b\u3002\\n\\n![](https://636c-cloudbase-1a4211-1252446325.tcb.qcloud.la/meoo.space/git-merge-type.webp)\\n\\n### \u5220\u9664\u5206\u652f\\n\u5f53\u5b8c\u6210\u4e00\u4e2a hotfix \u7684\u5408\u5e76\u4e4b\u540e\uff0c\u5e94\u8be5\u628a\u8be5\u5206\u652f\u5220\u9664\uff1a\\n```bash\\ngit branch -d hotfix\\n```\\n\\n## \u4e03\u3001\u8fdc\u7a0b\u5206\u652f\\n`git fetch cxlab` \u53ef\u4ee5\u5c06\u8fdc\u7a0b\u4ed3\u5e93 cxlab \u6709\u800c\u672c\u5730\u6ca1\u6709\u7684\u6570\u636e\u66f4\u65b0\u5230\u672c\u5730\u3002\u52a0\u4e0a `--all` \u53c2\u6570\u53ef\u4ee5\u6293\u53d6\u6240\u6709\u8fdc\u7a0b\u4ed3\u5e93\u7684\u6570\u636e\u3002\\n\\n\u8981\u7279\u522b\u6ce8\u610f\u7684\u4e00\u70b9\u662f\uff0c\u672c\u5730\u5df2\u6709 `cxlab/master` \u5206\u652f\uff0c\u5f53\u6293\u53d6\u5230\u65b0\u7684\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f `cxlab/serverfix` \u65f6\uff0c\u672c\u5730\u4e0d\u4f1a\u81ea\u52a8\u751f\u6210\u4e00\u4efd\u53ef\u7f16\u8f91\u7684\u526f\u672c\u3002\u6362\u4e00\u53e5\u8bdd\u8bf4\uff0c\u4e0d\u4f1a\u6709\u4e00\u4e2a\u65b0\u7684 serverfix \u5206\u652f\u2014\u2014\u53ea\u6709\u4e00\u4e2a\u4e0d\u53ef\u4ee5\u4fee\u6539\u7684 `cxlab/serverfix` \u6307\u9488\u3002\\n\\n\u53ef\u4ee5\u8fd0\u884c `git merge cxlab/serverfix` \u5c06\u8fd9\u4e9b\u5de5\u4f5c\u5408\u5e76\u5230**\u5f53\u524d\u6240\u5728\u7684\u5206\u652f**\u3002\u5982\u679c\u60f3\u8981\u5728\u81ea\u5df1\u7684 sf \u5206\u652f\u4e0a\u5de5\u4f5c\uff0c\u53ef\u4ee5\u5c06\u5176\u5efa\u7acb\u5728\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f\u4e4b\u4e0a\uff1a\\n```bash\\ngit checkout -b sf cxlab/serverfix\\n```\\n\\n### \u8ddf\u8e2a\u5206\u652f\\n\u4ece\u4e00\u4e2a\u8fdc\u7a0b\u8ddf\u8e2a\u5206\u652f\u68c0\u51fa\u4e00\u4e2a\u672c\u5730\u5206\u652f\uff0c\u4f1a\u81ea\u52a8\u521b\u5efa\u6240\u8c13\u7684\u201c\u8ddf\u8e2a\u5206\u652f\u201d\uff08\u5b83\u8ddf\u8e2a\u7684\u5206\u652f\u53eb\u505a\u201c\u4e0a\u6e38\u5206\u652f\u201d\uff09\u3002\u8ddf\u8e2a\u5206\u652f\u662f\u4e0e\u8fdc\u7a0b\u5206\u652f\u6709\u76f4\u63a5\u5173\u7cfb\u7684\u672c\u5730\u5206\u652f\u3002\u5982\u679c\u5728\u4e00\u4e2a\u8ddf\u8e2a\u5206\u652f\u4e0a\u8f93\u5165 `git pull`\uff0cGit \u80fd\u81ea\u52a8\u5730\u8bc6\u522b\u53bb\u54ea\u4e2a\u670d\u52a1\u5668\u4e0a\u6293\u53d6\u3001\u5408\u5e76\u5230\u54ea\u4e2a\u5206\u652f\u3002\\n\\n\u8bbe\u7f6e\u5df2\u6709\u7684\u672c\u5730\u5206\u652f\u8ddf\u8e2a\u4e00\u4e2a\u521a\u521a\u62c9\u53d6\u4e0b\u6765\u7684\u8fdc\u7a0b\u5206\u652f\uff0c\u6216\u8005\u60f3\u8981\u4fee\u6539\u6b63\u5728\u8ddf\u8e2a\u7684\u4e0a\u6e38\u5206\u652f\uff0c \u4f60\u53ef\u4ee5\u5728\u4efb\u610f\u65f6\u95f4\u4f7f\u7528 `-u` \u6216 `--set-upstream-to` \u9009\u9879\u8fd0\u884c `git branch` \u6765\u663e\u5f0f\u5730\u8bbe\u7f6e\u3002\\n```bash\\n$ git branch -u origin/serverfix\\nBranch sf set up to track remote branch serverfix from origin.\\n```\\n\\n`git branch -vv` \u4f1a\u5c06\u6240\u6709\u7684\u672c\u5730\u5206\u652f\u5217\u51fa\u6765\u5e76\u4e14\u5305\u542b\u66f4\u591a\u7684\u4fe1\u606f\uff0c\u5982\u6bcf\u4e00\u4e2a\u5206\u652f\u6b63\u5728\u8ddf\u8e2a\u54ea\u4e2a\u8fdc\u7a0b\u5206\u652f\u4e0e\u672c\u5730\u5206\u652f\u662f\u5426\u662f\u9886\u5148\u3001\u843d\u540e...\\n\\n### \u63a8\u9001\u5206\u652f\\n\u5c06 hotfix \u5206\u652f\u63a8\u9001\u5230 cxlab \u8fdc\u7a0b\u4ed3\u5e93\uff1a\\n```bash\\ngit push cxlab hotfix #\u5982\u9700\u5c06\u63a8\u9001\u5230\u670d\u52a1\u5668\u4e0a\u7684\u5206\u652f\u540d\u6539\u4e3a myhotfix\uff0c\u53ef\u8fd9\u6837 hotfix:myhotfix\\n```\\n\\n### \u5220\u9664\u8fdc\u7a0b\u5206\u652f\\n\u82e5\u5df2\u7ecf\u5b8c\u6210\u4e86\u70ed\u4fee\u590d\uff0c\u5e76\u4e14\u5df2\u7ecf\u5408\u5e76\u5230\u4e3b\u5206\u652f\uff0c\u5df2\u7ecf\u7528\u4e0d\u5230 serverfix \u5206\u652f\uff0c\u5219\u53ef\u4ee5\u4ece\u8fdc\u7a0b\u4ed3\u5e93\u5220\u9664\u5b83\uff1a\\n```bash\\ngit push origin --delete serverfix\\n```\\n\\n\u8bf4\u7684\u518d\u591a\u90fd\u4e0d\u5982\u770b\u4e00\u770b\u6587\u6863\uff0c\u5b9e\u5728\u662f\u7ec6\uff1ahttps://git-scm.com/book/zh/v2"}]}')}}]);