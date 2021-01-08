#include "file_writer.h"

template <typename Iterator>
void writeRangeToFile(Iterator begin, Iterator end, string pathToFile){
	ofstream file(pathToFile);
	for (auto it = begin; it != end; ++it){
		file << *it << '\n';
	}
	file.close();
}
void writeVectorToFile(const vector<Coordinates>& coords, string pathToFile){
	ofstream file(pathToFile);
	for (auto el : coords){
		file << el << '\n';
	}
	file.close();
}


