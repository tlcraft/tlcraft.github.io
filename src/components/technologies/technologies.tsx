import Marquee, { MarqueeProps } from "@/components/marquee/marquee";
import { faHtml5, faReact, faAngular, faAws, faPython, faCss3, faTrello, IconDefinition, faJira, faGithub, faGitlab, faBitbucket, faNpm, faLess, faSass, faBootstrap, faNode, faMicrosoft, faAtlassian, faConfluence, faGitAlt, faJs, faJenkins } from '@fortawesome/free-brands-svg-icons';
import { faDd } from '@/icons/ddIcon';
import { faTs } from '@/icons/tsIcon';
import { faVscode } from '@/icons/vscodeIcon';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

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
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="technologies">
                    <h2>Technical experience</h2>
                    <div className="skills">
                        <div className="card">
                            <h3>AWS</h3>
                            <ul className="list-disc">
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
                        <div className="card">
                            <h3>Microsoft</h3>
                            <ul className="list-disc">
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
                        <div className="card">
                            <h3>Other Technologies</h3>
                            <ul className="list-disc">
                                <li>Jest / Jasmine</li>
                                <li>jQuery</li>
                                <li>RESTful APIs</li>
                                <li>GraphQL</li>
                                <li>Microservices</li>
                                <li>Serverless</li>
                                <li>Terraform</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>Tools</h3>
                            <ul className="list-disc">
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
            </div>
        </section>
    );
}

export default Technologies;
