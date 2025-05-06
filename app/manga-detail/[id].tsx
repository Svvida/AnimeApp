import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { skipToken } from '@reduxjs/toolkit/query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DetailButton } from '@/components/shared/detail-button/detail-button';
import { Header } from '@/components/shared/detail-header/detail-header';
import { EntityList } from '@/components/shared/entity-list/entity-list';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { HeroSection } from '@/components/shared/hero-section/hero-section';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { Synopsis } from '@/components/shared/synopsis/synopsis';
import { MangaInformation } from '@/components/views/manga-detail/manga-information';
import { useSnackbar } from '@/providers/snackbar/snackbar-context';
import { useGetMangaByIdQuery } from '@/redux/api/manga-api';
import { openExternalLink } from '@/utils/linking';

const MangaDetailView = () => {
  const { showSnackbar } = useSnackbar();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const mangaId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const {
    data: mangaDetailData,
    error: mangaDetailError,
    isLoading: mangaDetailLoading,
  } = useGetMangaByIdQuery(mangaId ? { id: mangaId } : skipToken);

  const handleBack = () => {
    router.push('/manga');
  };

  if (mangaDetailLoading) return <LoadingState />;
  if (mangaDetailError) return <ErrorState message="Failed to load anime details" subtext="Please try again later" onBack={handleBack} />;
  if (!mangaDetailData) return <ErrorState message="Anime not found" onBack={handleBack} />;

  return (
    <View style={styles.container}>
      <Header onBack={handleBack} title={mangaDetailData.title_english || mangaDetailData.title} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeroSection media={mangaDetailData} />

        <View style={styles.contentContainer}>
          {mangaDetailData.synopsis && <Synopsis synopsis={mangaDetailData.synopsis} />}

          <MangaInformation mangaDetail={mangaDetailData} />

          <EntityList title="Genres" entities={mangaDetailData.genres} />
          {mangaDetailData.themes.length > 0 && <EntityList title="Themes" entities={mangaDetailData.themes} />}
          {mangaDetailData.authors.length > 0 && <EntityList title="Producers" entities={mangaDetailData.authors} />}

          <View style={styles.buttonContainer}>
            {mangaDetailData.url && (
              <DetailButton
                icon="open-outline"
                text="View on MyAnimeList"
                onPress={async () => await openExternalLink(mangaDetailData.url, showSnackbar)}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    marginTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  scrollView: {
    flex: 1,
  },
});

export default MangaDetailView;
