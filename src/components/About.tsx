import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Award, Heart } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustentabilidade",
      description: "Utilizamos apenas materiais naturais e sustentáveis, respeitando o meio ambiente.",
    },
    {
      icon: Users,
      title: "Tradição Familiar",
      description: "Técnicas passadas de geração em geração, preservando nossa cultura pantaneira.",
    },
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Cada peça é cuidadosamente selecionada e passa por rigoroso controle de qualidade.",
    },
    {
      icon: Heart,
      title: "Feito com Amor",
      description: "Mais que um produto, cada peça carrega a história e carinho de nossos artesãos.",
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Nossa História
            </Badge>
            <h2 className="text-4xl md:text-5xl font-artisan font-bold text-foreground mb-6">
              Raízes que se
              <span className="text-primary"> Espalham</span>
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                No coração do Pantanal, onde o ipê amarelo colore a paisagem com sua 
                beleza única, nasceu o <strong className="text-foreground">Gosto do Mato</strong>. 
                Somos uma família que há três gerações preserva as tradições artesanais 
                da nossa terra.
              </p>
              <p>
                Cada produto que criamos conta uma história. Das cestas de palha tecidas 
                sob a sombra das árvores nativas, aos potes de cerâmica moldados com o 
                barro sagrado do Pantanal, tudo é feito com as mãos e o coração.
              </p>
              <p>
                Nossa missão é levar um pedacinho desta terra mágica para sua casa, 
                preservando não apenas o artesanato, mas também a cultura e os 
                saberes ancestrais do nosso povo.
              </p>
            </div>
            
            <div className="mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Conheça Nossa Equipe
              </Button>
            </div>
          </div>

          {/* Values Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-natural transition-organic border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary font-artisan">3+</div>
                <div className="text-sm text-muted-foreground">Gerações</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary font-artisan">500+</div>
                <div className="text-sm text-muted-foreground">Peças Criadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary font-artisan">100%</div>
                <div className="text-sm text-muted-foreground">Artesanal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;