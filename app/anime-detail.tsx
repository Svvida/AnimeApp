import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Provider } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { skipToken } from '@reduxjs/toolkit/query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useGetAnimeByIdQuery } from '../src/redux/api/anime-api';
import { store } from '../src/redux/config/store';
import { Header } from '@/components/shared/detail-header/detail-header';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { MediaEntity } from '@/contract/general';

const EntityList = ({ title, entities }: { title: string; entities?: MediaEntity[] }) => {
  if (!entities || entities.length === 0) return null;

  return (
    <View style={styles.entityContainer}>
      <Text style={styles.sectionTitle}>{title}:</Text>
      <View style={styles.tagContainer}>
        {entities.map(entity => (
          <View key={entity.mal_id} style={styles.tag}>
            <Text style={styles.tagText}>{entity.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

function AnimeDetailContent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const animeId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  // Use the API hook directly from the anime API file
  const {
    data: animeDetailData,
    error: animeDetailError,
    isLoading: animeDetailLoading,
  } = useGetAnimeByIdQuery(animeId ? { id: animeId } : skipToken);

  const animeDetail = animeDetailData;

  const handleBack = () => {
    router.back();
  };

  const handleOpenLink = () => {
    if (animeDetail?.url) {
      Linking.openURL(animeDetail.url);
    }
  };

  const handleOpenTrailer = () => {
    if (animeDetail?.trailer.url) {
      Linking.openURL(animeDetail.trailer.url);
    }
  };

  return (
    <View style={styles.container}>
      <Header onBack={handleBack} title={animeDetail?.title_english || animeDetail?.title} />

      {animeDetailLoading ? (
        <LoadingState />
      ) : animeDetailError ? (
        <ErrorState message="Failed to load anime details" subtext="Please try again later" onBack={handleBack} />
      ) : animeDetail ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.heroSection}>
            <Image
              source={{ uri: animeDetail.images.jpg.large_image_url || animeDetail.images.jpg.image_url }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <View style={styles.overlay} />
            <View style={styles.heroContent}>
              <Image
                source={{ uri: animeDetail.images.jpg.large_image_url || animeDetail.images.jpg.image_url }}
                style={styles.posterImage}
                resizeMode="cover"
              />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{animeDetail.title_english || animeDetail.title}</Text>
                {animeDetail.title_japanese && <Text style={styles.japaneseTitle}>{animeDetail.title_japanese}</Text>}
                <View style={styles.infoRow}>
                  <Text style={styles.type}>{animeDetail.type}</Text>
                  <View style={styles.scoreContainer}>
                    <Ionicons name="star" size={16} color="#FFC107" />
                    <Text style={styles.score}>{animeDetail.score.toFixed(1)}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            {animeDetail.synopsis && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Synopsis</Text>
                <Text style={styles.synopsis}>{animeDetail.synopsis}</Text>
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Information</Text>
              <View style={styles.infoGrid}>
                {animeDetail.status && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Status</Text>
                    <Text style={styles.infoValue}>{animeDetail.status}</Text>
                  </View>
                )}
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Episodes</Text>
                  <Text style={styles.infoValue}>{animeDetail.episodes}</Text>
                </View>
                {animeDetail.duration && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Duration</Text>
                    <Text style={styles.infoValue}>{animeDetail.duration}</Text>
                  </View>
                )}
                {animeDetail.rating && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Rating</Text>
                    <Text style={styles.infoValue}>{animeDetail.rating}</Text>
                  </View>
                )}
                {animeDetail.season && animeDetail.year && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Season</Text>
                    <Text style={styles.infoValue}>
                      {animeDetail.season.charAt(0).toUpperCase() + animeDetail.season.slice(1)} {animeDetail.year}
                    </Text>
                  </View>
                )}
                {animeDetail.source && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Source</Text>
                    <Text style={styles.infoValue}>{animeDetail.source}</Text>
                  </View>
                )}
                {animeDetail.scored_by && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Scored By</Text>
                    <Text style={styles.infoValue}>{animeDetail.scored_by.toLocaleString()}</Text>
                  </View>
                )}
                {animeDetail.rank && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Rank</Text>
                    <Text style={styles.infoValue}>#{animeDetail.rank}</Text>
                  </View>
                )}
                {animeDetail.popularity && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Popularity</Text>
                    <Text style={styles.infoValue}>#{animeDetail.popularity}</Text>
                  </View>
                )}
              </View>
            </View>

            <EntityList title="Studios" entities={animeDetail.studios} />
            <EntityList title="Genres" entities={animeDetail.genres} />
            {animeDetail.themes.length > 0 && <EntityList title="Themes" entities={animeDetail.themes} />}
            {animeDetail.producers && animeDetail.producers.length > 0 && <EntityList title="Producers" entities={animeDetail.producers} />}

            <View style={styles.buttonContainer}>
              {animeDetail.trailer.url && (
                <TouchableOpacity style={styles.button} onPress={handleOpenTrailer}>
                  <Ionicons name="logo-youtube" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Watch Trailer</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.button} onPress={handleOpenLink}>
                <Ionicons name="open-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>View on MyAnimeList</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Anime not found</Text>
          <TouchableOpacity style={styles.backButtonError} onPress={handleBack}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default function AnimeDetailScreen() {
  return (
    <Provider store={store}>
      <AnimeDetailContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  heroSection: {
    position: 'relative',
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  heroContent: {
    position: 'absolute',
    bottom: -60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  posterImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  titleContainer: {
    flex: 1,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  japaneseTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  score: {
    color: '#fff',
    marginLeft: 4,
    fontWeight: '500',
    fontSize: 12,
  },
  contentContainer: {
    marginTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  synopsis: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  entityContainer: {
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 12,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonError: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
});
