import Marquee, { MarqueeProps } from "@/components/marquee/marquee";
import { faHtml5, faReact, faAngular, faAws, faPython, faCss3, faTrello, IconDefinition, faJira, faGithub, faGitlab, faBitbucket, faNpm, faLess, faSass, faBootstrap, faNode, faMicrosoft, faAtlassian, faConfluence, faGitAlt, faJs, faJenkins } from '@fortawesome/free-brands-svg-icons';
import { faDd } from '@/icons/ddIcon';
import { faTs } from '@/icons/tsIcon';
import { faVscode } from '@/icons/vscodeIcon';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import LayoutContainer from "@/components/theme/LayoutContainer";

function Technologies() {
    const technologies: IconDefinition[] = [
        faHtml5, faReact, faAngular, faPython, faCss3, faLess, faSass, faBootstrap, faNode, faJs, faTs, faDatabase
    ];

    const tools: IconDefinition[] = [
        faAws, faTrello, faGitAlt, faJira, faGithub, faGitlab, faBitbucket, faNpm, faMicrosoft, faConfluence, faAtlassian, faJenkins, faDd, faVscode
    ];

    const technologyMarqueeProps: MarqueeProps = {
        items: technologies,
        leftToRight: false
    };

    const toolMarqueeProps: MarqueeProps = {
        items: tools,
        leftToRight: true
    };

    return (
        <section className="w-full bg-[#008ac5] text-white" id="technologies">
            <LayoutContainer className="py-12 space-y-8 2xl:max-w-6xl">
                <div className="technologies">
                    <h2 className="text-2xl font-semibold tracking-tight">Technical experience</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mt-4">
                        <div className="rounded-xl bg-white/10 ring-1 ring-white/15 p-5 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-semibold">AWS</h3>
                            <ul className="mt-3 list-disc list-inside sm:list-outside lg:list-inside sm:ps-5 space-y-1 break-words text-base md:text-lg">
                                <li>Lambda</li>
                                <li>Step Functions</li>
                                <li>DynamoDB</li>
                                <li>DocumentDB</li>
                                <li>Textract</li>
                                <li>PostgreSQL</li>
                                <li>SQS</li>
                                <li>CDK</li>
                                <li>CLI</li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-white/10 ring-1 ring-white/15 p-5 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-semibold">Microsoft</h3>
                            <ul className="mt-3 list-disc list-inside sm:list-outside lg:list-inside sm:ps-5 space-y-1 break-words text-base md:text-lg">
                                <li>TypeScript</li>
                                <li>ASP.NET Web API and MVC</li>
                                <li>SQL Server</li>
                                <li>Entity Framework</li>
                                <li>C#</li>
                                <li>Moq</li>
                                <li>AutoMapper</li>
                                <li>NuGet</li>
                                <li>TFS</li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-white/10 ring-1 ring-white/15 p-5 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-semibold">Other Technologies</h3>
                            <ul className="mt-3 list-disc list-inside sm:list-outside lg:list-inside sm:ps-5 space-y-1 break-words text-base md:text-lg">
                                <li>Jest / Jasmine</li>
                                <li>jQuery</li>
                                <li>RESTful APIs</li>
                                <li>GraphQL</li>
                                <li>Microservices</li>
                                <li>Serverless</li>
                                <li>Terraform</li>
                            </ul>
                        </div>
                        <div className="rounded-xl bg-white/10 ring-1 ring-white/15 p-5 shadow-sm overflow-hidden">
                            <h3 className="text-lg font-semibold">Tools</h3>
                            <ul className="mt-3 list-disc list-inside sm:list-outside lg:list-inside sm:ps-5 space-y-1 break-words text-base md:text-lg">
                                <li>Visual Studio</li>
                                <li>SQL Server Management Studio</li>
                                <li>DBeaver</li>
                                <li>TablePlus</li>
                                <li>NoSQL Workbench</li>
                                <li>Postman</li>
                                <li>Insomnia</li>
                                <li>Beyond Compare</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Marquee {...technologyMarqueeProps} />
                <Marquee {...toolMarqueeProps} />
            </LayoutContainer>
        </section>
    );
}

export default Technologies;
