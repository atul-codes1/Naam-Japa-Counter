import React from 'react';
import SEO from '../components/common/SEO';
import premanandJi from '../assets/images/pujya-shri-premanand-ji-maharaj-japa.jpg';
import { globalKeywords } from '../data/seoContent';

const PremanandJiPage = () => {
    return (
        <div className="page-container">
            <SEO
                title="Pujya Shri Premanand Ji Maharaj | Japa Counter"
                description="Read the teachings of Pujya Shri Premanand Ji Maharaj on Name Jaap, surrender, and Radha Bhakti. Enhance your spiritual journey."
                keywords={["Premanand Ji Maharaj", "Vrindavan", "Radha Vallabh", "Satsang", "Guru", ...globalKeywords]}
                image={premanandJi}
                type="article"
            />
            <div className="page-content">
                <div className="page-inner">
                    <h1 className="guru-main-title animate-fade-in-down">
                        🙏 Pujya Shri Premanand Ji Maharaj 🙏
                    </h1>
                    <div className="guru-image-container animate-fade-in delay-300">
                        <img
                            src={premanandJi}
                            alt="Pujya Shri Premanand Ji Maharaj chanting Radha Naam in Vrindavan"
                            className="guru-image"
                        />
                    </div>
                    <div className="guru-card animate-slide-up delay-400">

                        <div className="guru-text-content">
                            <h2 className="guru-title">Radha Vallabh Shri Harivansh</h2>

                            <p className="guru-text">
                                Pujya Shri Premanand Ji Maharaj is a revered saint from Vrindavan who has dedicated his life to the loving devotion of Shri Radha Krishna. His teachings emphasize the immense power of chanting the Holy Name (Naam Jap) and living a life of absolute surrender to the Divine.
                            </p>
                            <h3 className="guru-subtitle">Guru and Spiritual Lineage</h3>
                            <p className="guru-text">
                                Pujya Shri Premanand Ji Maharaj is a believer of guru-shishya parampara, the ancient tradition of spiritual transmission in santan dharma. He often prioritises that progress on the spiritual path is incomplete in absence of a guru (teacher).
                                <br />
                                <br />
                                Under the blessings and teachings of his Guru, he gained the knowledge about bhakti, surrender and self-realization. His discourses reflect the knowledge of scriptures combined with practical guidance for daily life.
                            </p>

                            <h3 className="guru-subtitle">Why Maharaj Ji Emphasizes Naam Jap</h3>


                            <h4 className="guru-subheading">1. Naam Jap Purifies the Mind Directly</h4>
                            <p className="guru-text">
                                According to Pujya Shri Premanand Ji Maharaj, all impurities reside in the mind, not in the body. Therefore, true purification must begin internally, and Naam Jap is the most powerful means to cleanse the mind.
                            </p>
                            <ul className="guru-list">
                                <li>Removes negative and disturbing thoughts</li>
                                <li>Cleanses deeply hidden mental impressions</li>
                                <li>Brings inner peace and clarity</li>
                            </ul>
                            <p className="guru-text">
                                Rituals may purify externally, but Naam Jap purifies the inner consciousness.
                            </p>

                            <h4 className="guru-subheading">2. Naam Jap Awakens Bhav (Inner Feeling)</h4>
                            <p className="guru-text">
                                Maharaj Ji teaches that spiritual growth through Naam Jap depends on sincerity and intention, not on outward performance. The process unfolds naturally within the heart.
                            </p>
                            <ul className="guru-list">
                                <li>Awakens love and devotion</li>
                                <li>Cultivates humility and surrender</li>
                                <li>Leads to tears of devotion and inner transformation</li>
                            </ul>
                            <p className="guru-text">
                                He considers the softening and fulfillment of the heart as the true sign of spirituality.
                            </p>

                            <h4 className="guru-subheading">3. Naam Jap Is the Path of Grace, Not Effort</h4>
                            <p className="guru-text">
                                Traditional rituals often depend on personal effort, but Naam Jap flows through divine grace.
                            </p>
                            <p className="guru-text">
                                Maharaj Ji often says, <em>“Naam Jap works by itself—you only need to keep repeating it.”</em>
                            </p>
                            <p className="guru-text">
                                This makes Naam Jap accessible to everyone, even those who feel spiritually weak, as it relies on divine mercy rather than human capability.
                            </p>

                            <h3 className="guru-subtitle">The Power of Radha Naam</h3>
                            <p className="guru-text">
                                Pujya Shri Premanand Ji Maharaj teaches that "Radha" is not just a name, but the very essence of divine love. By chanting "Radha Radha," one purifies the heart and invites the grace of Shri Krishna. He often says that there is no difference between the Name and the Named (Naam and Nami).
                            </p>

                            <h3 className="guru-subtitle">Key Teachings</h3>
                            <ul className="guru-list">
                                <li>Chant the Holy Name constantly with every breath.</li>
                                <li>See the Divine in every living being.</li>
                                <li>Maintain absolute purity in thought, word, and deed.</li>
                                <li>Surrender all worries to Shriji (Radha Rani).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremanandJiPage;
