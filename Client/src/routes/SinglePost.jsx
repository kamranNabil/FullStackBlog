import Image from "../components/image";
import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search.jsx";
import Comments from "../components/Comments.jsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return response.data;
};

const SinglePost = () => {
  const { slug } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "An error occurred: " + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8">
      {/* Details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>written by</span>
            <Link className="text-blue-800">{data.user?.username || "Unknown"}</Link>
            <span>on</span>
            <Link className="text-blue-800">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">
            {data.desc}
          </p>
        </div>
        {data.img && <div className="hidden lg:block w-2/5">
          <Image
            src={data.img}
            w="600"
            h="300"
            className="rounded-2xl"
          />
        </div>}
      </div>
      {/*Content  */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
            repellendus deleniti eum aliquid similique quibusdam expedita, optio
            doloremque ab quisquam quis rem amet impedit tempora. Nemo provident
            recusandae nam! Neque veniam debitis atque ad doloremque expedita
            maxime ea officiis sit, voluptatum temporibus nobis impedit in
            tempore quo, natus exercitationem nihil vero magni, facilis aut
            saepe cupiditate! Minus, dolorum eligendi! Cumque fuga qui minus.
            Eius saepe iure nemo cumque molestiae ducimus accusantium quae dicta
            veritatis vitae deleniti, nulla numquam fuga sequi voluptatibus
            pariatur animi praesentium harum voluptas ad atque! Non? Magnam
            corporis, delectus reprehenderit ipsa, incidunt dicta ipsum ad enim
            tempora ducimus fugiat! Maxime nostrum voluptas, necessitatibus
            inventore reprehenderit vel quam rerum itaque odit, reiciendis minus
            sed, culpa doloremque placeat? Excepturi commodi tempore illum,
            accusamus eum voluptas recusandae corrupti. Fuga eius enim ea
            suscipit iure id laudantium, perferendis laboriosam porro laborum,
            excepturi delectus vero, deleniti reiciendis ad? Doloribus,
            cupiditate accusamus. Error perspiciatis facere harum accusamus
            ducimus dolore illum vitae! Illum debitis unde nam possimus deserunt
            labore enim qui dolorum saepe! Non eum sint quod cum officiis
            doloremque ipsa omnis accusamus! Laboriosam ipsa minus aspernatur
            mollitia reprehenderit distinctio, culpa officia, enim qui esse nam
            necessitatibus, sed libero quod voluptate. Odio, ex maiores. Unde
            quia ea repellendus nobis soluta delectus doloribus! Reprehenderit.
            Quas nemo ipsa, maiores eum facilis dicta? Reiciendis cupiditate
            quasi sint corporis amet at ratione voluptatem asperiores accusamus
            velit, ab illo, doloremque expedita distinctio natus. Corporis ea
            ratione ab deleniti. Commodi debitis voluptatem quam ab nihil iste
            unde a eveniet! Numquam illum consequatur reiciendis recusandae
            incidunt aspernatur iusto debitis consequuntur animi nisi aperiam
            quam officiis blanditiis, eaque, facilis nostrum repellendus.
            Molestias iusto quae est similique inventore sed totam. Placeat,
            error ducimus? Expedita labore magni officia, eum commodi iste
            explicabo totam facilis velit nihil sequi impedit excepturi, nulla
            in accusamus illo. Ullam adipisci non quas harum reiciendis
            similique totam, perspiciatis illum obcaecati magni sed nam labore
            aperiam esse amet quis nihil necessitatibus, distinctio temporibus
            voluptatibus laudantium molestiae. Aliquid officiis accusamus eius.
            Exercitationem iusto quod quos delectus aperiam pariatur, incidunt,
            atque magni quo totam facere, quia beatae eveniet nemo a tempore
            dolore? Velit distinctio reiciendis eius aperiam voluptas doloribus
            dolore sequi ex. Modi deserunt voluptatem enim quidem rerum magni?
            Architecto nostrum ad, repellendus deserunt assumenda molestias hic
            quia pariatur id accusantium ipsam sequi ullam, eaque repellat et
            commodi magnam dolores vero possimus. Magni, accusantium. Tenetur
            officiis voluptates consequatur. Repellendus distinctio alias odio
            debitis suscipit est, sit dolorum delectus maxime corrupti
            perspiciatis odit error temporibus eaque corporis harum. Architecto
            voluptate quos quam dolorem! Nesciunt ducimus sit voluptatibus at
            ipsum quisquam corrupti, error debitis laboriosam vel, nisi
            reprehenderit rerum expedita fugit hic distinctio accusantium quos
            magnam! Optio commodi obcaecati reprehenderit, pariatur culpa
            numquam natus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            labore autem. Officiis veritatis adipisci, dolorem amet iusto quae
            itaque ea mollitia commodi corrupti unde vitae dolores quos
            voluptates pariatur recusandae? Voluptate suscipit, nam commodi modi
            sint tenetur nostrum iusto accusantium praesentium, error libero? Ut
            rerum nobis vero minus ipsum veniam tenetur, consequatur quos
            excepturi atque amet suscipit reiciendis corrupti iste. Sapiente vel
            harum ipsa suscipit officia debitis voluptatibus saepe cum modi
            quisquam tenetur minima officiis deleniti perferendis illo ipsam
            quasi asperiores quos, earum, temporibus iste? Omnis amet nobis
            placeat officia? Dolor consectetur illum eaque pariatur totam
            voluptatum magni atque iusto? Voluptatibus quisquam voluptates,
            eligendi rem perferendis doloribus doloremque veritatis rerum eaque
            ut at repudiandae repellat, ducimus libero. Illum, unde assumenda?
            Dolores numquam sit ab voluptatibus quibusdam, architecto soluta
            voluptatem, aut nihil eveniet tempora. Possimus eaque rerum
            repellendus atque, saepe laborum nam veniam ea quia qui voluptate
            ducimus nemo animi! Rerum. Earum quasi consequuntur quae, aspernatur
            ipsam officiis a qui numquam esse! In et, dicta ex consequuntur
            dolores magni deserunt. Ut sit cumque error qui eveniet. Quasi
            nesciunt corrupti temporibus hic? Quaerat atque ad consequuntur
            velit recusandae pariatur provident distinctio. Nihil odio molestiae
            fuga deleniti vero accusamus laudantium praesentium asperiores quasi
            eum minus, nostrum modi magnam, quam ex totam? A, expedita!
            Excepturi sit rerum eum, numquam voluptate similique voluptates
            quaerat mollitia earum consequatur neque. Officiis minus a molestiae
            dolor unde quos ipsam et porro cumque aliquam modi qui possimus,
            laudantium consectetur. Voluptatibus asperiores alias obcaecati quo
            quae beatae eligendi cupiditate eos? Rerum, perspiciatis dolorem,
            cupiditate velit minus cumque ut deserunt nostrum dolor porro
            similique modi voluptatum accusamus, veniam aperiam commodi
            suscipit? Velit temporibus deleniti magnam vitae dolorum assumenda
            labore itaque praesentium? Incidunt magnam quae cupiditate tenetur,
            eligendi id vitae quia accusamus nisi! Eaque iste modi, aut error
            ratione esse rem est. Enim fugit in velit dicta eaque soluta, quod
            veniam hic eum quo voluptatem et quam perspiciatis error beatae
            doloribus consequatur! Provident molestias sint reiciendis quas
            quidem deleniti distinctio tempora beatae? Officia soluta minus fuga
            alias molestias ratione? Eligendi voluptates dolorem cupiditate
            corporis explicabo laborum doloremque, fuga voluptatem eaque
            sapiente iusto, beatae unde modi. Blanditiis rem quae aut recusandae
            obcaecati consequatur. Ratione, optio similique voluptas recusandae
            ipsum maiores. Dolores quas exercitationem quia. Nesciunt voluptate
            veritatis voluptatem odit quos. Praesentium earum eos excepturi.
            Quaerat, cum iste corrupti nisi vero obcaecati tenetur recusandae.
            Dolor totam deleniti eius iusto hic veniam expedita modi minus.
            Quam, voluptatem? Repudiandae sint, doloremque quasi illum sed
            obcaecati officiis provident, libero reiciendis deserunt, atque quia
            odit eaque accusamus ipsum. Provident vel ullam delectus quasi!
            Provident repellat minima unde fuga quidem dolorem, placeat
            explicabo! Harum iusto sed fuga molestiae est non dolorem voluptas
            veniam. Nostrum, voluptatum? Adipisci ex cum fugiat!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus placeat autem esse delectus ipsa magnam, unde
            perspiciatis dolore architecto maiores itaque obcaecati eaque
            pariatur omnis, reiciendis soluta officiis amet voluptatum!
            Perspiciatis blanditiis omnis doloribus saepe quo cupiditate
            repudiandae dicta ad, quidem eaque soluta quasi repellendus magni
            odit voluptas commodi optio et sed? Iure eligendi atque aspernatur
            iusto blanditiis, quis id? Fugit similique sit a tempore harum
            voluptas ipsum aperiam laboriosam neque? Consequuntur esse excepturi
            non enim molestias vitae quasi harum, quia odio libero fuga
            exercitationem eius eum! Expedita, id tempora? Ipsum laborum
            incidunt qui ullam omnis nobis harum illum vitae architecto
            obcaecati. Vero quae molestiae architecto laboriosam fugiat, illo
            quo distinctio impedit sint amet? Quam expedita sit ab perspiciatis
            animi? Non culpa perspiciatis quos, laboriosam cumque vel, tempora
            iure quasi beatae, impedit maiores error. Necessitatibus temporibus
            laudantium cupiditate similique. Eius quidem quaerat distinctio
            pariatur eos aspernatur reprehenderit veritatis beatae magni?
            Deleniti culpa dolorem rerum id iste quisquam et aut corrupti earum
            officia delectus totam veritatis laborum quasi, inventore ipsam hic,
            dicta voluptatem eaque vitae nemo placeat laboriosam! Praesentium,
            hic accusantium? Amet necessitatibus veniam nihil odit nesciunt
            voluptatibus. Nostrum omnis excepturi rem ullam, rerum est aperiam
            beatae voluptatum magnam ad aliquam unde! Sapiente odio earum non
            esse deserunt ipsum, ducimus nihil. Molestiae inventore
            reprehenderit provident. Enim libero laudantium ex excepturi non
            alias culpa earum eius voluptatibus, laborum architecto beatae
            dolorum dicta atque laboriosam est fuga placeat expedita animi natus
            omnis neque? Omnis excepturi accusamus provident molestiae aperiam
            praesentium porro aliquam vitae velit voluptates minus dolore harum
            fugiat iure dolores fugit quidem sint beatae dolorem alias similique
            cumque, tenetur a. Quaerat, repellat? Harum eveniet laborum quis at
            repellat, quod saepe eos excepturi tempore accusantium praesentium
            nesciunt laboriosam perspiciatis, iure sapiente fugit perferendis
            exercitationem aut. Nam ipsum velit molestiae ullam quasi, eum
            fugiat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            quibusdam repudiandae magnam rem suscipit! Quo accusantium laborum
            ex at totam quam quae sunt! Asperiores porro aut voluptates nemo
            fugiat soluta? Consequatur necessitatibus maiores ratione aliquid
            inventore error debitis aliquam odit autem iure in qui fugiat velit
            fuga corporis, sit odio impedit nam id nisi doloribus fugit
            consequuntur. Dolore, voluptatem esse? Fuga ratione ad obcaecati
            dicta autem ducimus quam impedit a. Ex eaque tenetur cupiditate
            optio laboriosam rerum sed reprehenderit eos, pariatur, possimus,
            architecto nemo ipsa illo repudiandae molestias magni expedita.
            Labore, dolor! Dolorum rem ex cupiditate fuga laudantium, alias eos
            a adipisci numquam ipsa, accusantium ut quisquam voluptas incidunt,
            inventore blanditiis hic necessitatibus. Sapiente nihil deserunt
            dolores molestiae dolorum quidem? Quibusdam excepturi voluptas
            ducimus perferendis ex aperiam eveniet ad ab expedita hic quidem
            vel, necessitatibus earum, libero magni porro sit ullam quisquam
            facere, iste molestiae eligendi. Excepturi quaerat dolorem ipsam.
            Sapiente dolorem necessitatibus earum ducimus, ex facilis nihil
            doloribus molestias temporibus quo ab? Error, tenetur. Qui corporis
            perferendis cumque hic voluptatum error libero harum fugiat neque,
            molestias deleniti assumenda soluta. Sunt excepturi alias tenetur,
            ducimus vel voluptatum temporibus velit, et rem ut quod ipsa amet
            error soluta placeat praesentium eaque, minus possimus ratione
            suscipit! Optio unde ut excepturi velit vel! Officiis fugit, eum
            suscipit impedit nihil eius esse alias reiciendis at quo repellendus
            sed veritatis culpa quibusdam beatae assumenda iusto animi, totam
            placeat cumque natus id. Doloribus, possimus eligendi. Eos.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            sint nesciunt accusamus consequuntur, ullam quas enim deleniti
            perferendis soluta non hic rem cum laborum numquam magnam quo minus
            modi praesentium? Facilis cumque accusamus debitis exercitationem
            obcaecati facere officia doloribus excepturi voluptate quis expedita
            aspernatur provident modi soluta atque, enim at aliquam iure. Ullam
            id delectus nostrum sit inventore error iusto. Perferendis ab libero
            architecto adipisci ratione voluptas nemo, dolor minima repellendus
            minus alias molestias ipsum maiores sint reprehenderit itaque
            deserunt! Et necessitatibus alias nemo nostrum fuga, illo impedit
            dolore eaque. Aperiam quis qui magni hic quia quod rem quisquam
            saepe recusandae officia voluptatem ad eveniet voluptatibus ipsam,
            reiciendis nam sint accusantium est modi consectetur ea aspernatur
            incidunt repellat nobis! Soluta? Quia odio reiciendis id eum nobis
            delectus praesentium accusantium sapiente tempore voluptatem non
            sequi a ullam soluta, voluptatibus dolorem impedit error porro ipsa!
            Atque ab, incidunt nostrum veritatis quasi et.
          </p>
        </div>
        {/* Menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mt-8 mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user?.img && <Image
                src={data.user.img}
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />}
              <Link className="text-blue-800">{data.user?.username || "Unknown"}</Link>
            </div>
            <p className="text-sm text-gray-500">
              lorem ipsum dolor sit amet consectetur
            </p>
            <div className="flex gap-2">
              <Link>
                <Image src="/public/facebook.svg" />
              </Link>
              <Link>
                <Image src="/public/instagram.svg" />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data}/>
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline" to="/">
              Web Design
            </Link>
            <Link className="underline" to="/">
              App Development
            </Link>
            <Link className="underline" to="/">
              Database
            </Link>
            <Link className="underline" to="/">
              SEO
            </Link>
            <Link className="underline" to="/">
              Marketing
            </Link>
          </div>
          <h1 className="mt-5 mb-2 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={data._id}/>
    </div>
  );
};

export default SinglePost;